module.exports=((ATA)=>{
	const Path = "./Core/";
	const wt = require("node:child_process");
	
	const ww = Symbol();
	const isReady = Symbol();
	
	const Pack = (obj)=>{
		return Buffer.from(JSON.stringify({
			...obj
		})).toString("base64");
	};
	
	const Loader = (class_, config)=>{
		return()=>{
			const path = ATA.Path.join(ATA.MWD, "./App/Run.Thread.js");
			const worker = wt.fork(path, {
				env: {
					Opts: Pack({
						Module: {
							Name: config.Name,
							Type: class_.Type,
							
						},
						Project: {
							Name: config.Project.Name,
						},
						Environment: {
							...config.Environment,
						},
					}),
					
				},
				//stdio: ["pipe", "pipe", "pipe", "ipc"],
			});
			class_[ww] = worker;
			const addlistener = worker.addListener || worker.addEventListener || worker.on;
			
			addlistener.apply(worker, ["message", async function(){
				console.log("Core message", [...arguments]);
				class_.OK([...arguments]);
				//class_.OnMessage.apply(worker,[...arguments]);
				//class_.HeartBeat();
			}]);
			
			addlistener.apply(worker, ["error", async function(){
				console.log("Core error", [...arguments]);
				class_.NO([...arguments]);
				//class_.OnError.apply(worker,[...arguments]);
				//class_.HeartBeat();
			}]);
			
			addlistener.apply(worker, ["exit", async function(){
				console.log("Core exit", [...arguments]);
				class_.NO([...arguments]);
				//class_.OnExit.apply(worker,[...arguments]);
				//class_.HeartBeat();
			}]);
			
			class_.Promise.then(()=>{
				class_[isReady] = true;
			}).catch(()=>{
				class_[isReady] = false;
			});
		};
	};
	
	return(class_)=>{
		return class extends class_{
			[ww] = null;
			[isReady] = false;
			
			OnMessage = null;
			OnError = null;
			OnExit = null;
			constructor(config){
				super({
					Path,
					...config,
				});
				this.OnMessage = ()=>{};
				this.OnError = ()=>{};
				this.OnExit = ()=>{};
				this[ww] = Loader(this, config);
			};
			
			get Type(){
				return "Core";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			async Execute(){
				try{
					this[ww]();
				}catch(e){
					throw e;
				}
			};
			
			Send(){
				this[ww].send.apply(this[ww], [...arguments]);
			};
			
			HeartBeat(){
				
			};
			
			Check(){
				
			};
			
			Terminate(){
				
			};
		};
	};
})(ATA());