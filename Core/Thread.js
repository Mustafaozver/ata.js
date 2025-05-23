module.exports = ((ATA)=>{
	const wt = require("node:child_process");
	const datapool = {};
	const stack = {};
	var count = 0;
	
	ATA.SetVariable = (key, value)=>{
		datapool["" + key] = value;
	};
	
	ATA.GetVariable = (key)=>{
		return datapool["" + key];
	};
	
	const Thread = class{
		OnMessage = null;
		OnExit = null;
		OnError = null;
		__updatetime = 0;
		ID = "";
		
		constructor(){
			this.ID = "TH_" + (count++);
			this.Create();
			stack[this.ID] = this;
			
			this.OnMessage = function(msg){};
			this.OnExit = function(){};
			this.OnError = function(){};
		};
		
		Create(){
			var THAT = this;
			this.__updatetime = (new Date()).getTime();
			
			this._WW = wt.fork("./Ata.wt.js");
			var addlistener = this._WW.addListener || this._WW.addEventListener || this._WW.on;
			
			addlistener.apply(this._WW, ["message", async function(){
				THAT.OnMessage.apply(THAT,[...arguments]);
				THAT.HeartBeat();
			}]);
			
			addlistener.apply(this._WW, ["error", async function(){
				THAT.OnError.apply(THAT,[...arguments]);
				THAT.HeartBeat();
			}]);
			
			addlistener.apply(this._WW, ["exit", async function(){
				THAT.OnExit.apply(THAT,[...arguments]);
				THAT.HeartBeat();
			}]);
			
			
			
			return;
			this._WW = new wt.Worker("./Ata.wt.js");
			var addlistener = this._WW.addListener || this._WW.addEventListener;
			addlistener.apply(this._WW, ["message", async function(){
				THAT.OnMessage.apply(THAT,[...arguments]);
				THAT.HeartBeat();
			}]);
			addlistener.apply(this._WW, ["error", function(){
				THAT.OnError.apply(THAT,[...arguments]);
				THAT.HeartBeat();
			}]);
			addlistener.apply(this._WW, ["exit", function(){
				THAT.OnExit.apply(THAT,[...arguments]);
				THAT.HeartBeat();
			}]);
		};
		
		HeartBeat(){
			this.__updatetime = (new Date()).getTime();
		};
		
		Check(){
			if(((new Date()).getTime() - this.__updatetime) > 60000){
				this.OnError();
			}
		};
		
		Terminate(){
			this._WW.terminate();
		};
		
		InjectData(key, value){
			this.Run("(function(ATA,key,value){ATA.SetVariable(key,value);})(ATA()," + JSON.stringify(key) + "," + JSON.stringify(value) + ");");
		};
		
		Run(code, args=[]){
			code = "(" + code + ")(" + args.map(JSON.stringify).join(",") + ")";
			var ID = "1";
			this._WW.send({
				ID:ID,
				EVAL:code,
			});
			return;
			this._WW.postMessage({
				ID:ID,
				EVAL:code,
			});
		};
	};
	
	ATA.Loops.push(()=>{
		for(var key in stack){
			stack[key].Check();
		}
	});
	
	return Thread;
})(ATA());