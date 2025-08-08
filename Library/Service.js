module.exports=((ATA)=>{
	const Path = "./Service/";
	const data_ = Symbol();
	
	const _active = Symbol();
	const _status = Symbol();
	const _startTime = Symbol();
	const _readyTime = Symbol();
	
	ATA.GLOBAL.SERVICE = {
		Get: null,
	};
	
	const stack = {};
	
	Object.defineProperty(ATA.GLOBAL.SERVICE, "Get", {
		get: ()=>{
			return(name)=>{
				return stack[name].Export;
			};
		}
	});
	
	const Loader = (class_, config)=>{
		stack[config.Name] = class_;
		class_.Promise.then((data)=>{   
			class_[_readyTime] = (new Date()).getTime();
			class_[_status] = "C";
		}).catch(()=>{
			class_[_readyTime] = -1;
			class_[_status] = "E";
			this[_active] = false;
		});
	};
	
	const Awaiter = async(func)=>{
		if(func.constructor.name === "Function")return new Promise(func);
		else if(func.constructor.name === "AsyncFunction")return await func();
		else if(func.constructor.name === "Array")return func.map(Awaiter);
		else return func;
	};
	
	const Queue = async(mode="all", arr=[])=>{
		
		const arr_ = [...arr];
		switch(mode){
			default:
			case"all":
				return Promise.all(arr_.map((item)=>{
					return new Promise(item);
				}));
			break;
			case"race":
				return Promise.race(arr_.map((item)=>{
					return new Promise(item);
				}));
			break;
			case"order":
				const calls = arr_.reduce((prev, curr)=>{
					
					const promise = new Promise(async(resolve, reject)=>{
						try{
							const resp = await prev;
							return curr(resolve, reject, resp);
						}catch(e){
							reject(e);
						}
						reject();
					});
					
					return promise;
				}, Promise.resolve());
				return calls;
			break;
		}
	};
	
	return(class_, Adapter)=>{
		const _GLOBAL = Adapter.GenerateServiceGlobal();
		
		return class extends class_{
			static Path = Path;
			[data_] = null;
			[_active] = false;
			[_status] = "P"; // P ending, D one, R eady, E rror, S tarted, C ompleted
			
			[_startTime] = 0;
			[_readyTime] = 0;
			
			constructor(config){
				super({
					Path,
					...config,
				});
				this[data_] = Loader(this, config);
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			get Return(){
				return this[data_];
			};
			
			get Type(){
				return "Service";
			};
			
			get Active(){
				return this[_active];
			};
			
			get Status(){
				return this[_status];
			};
			
			LoadRoot(){
				return this.LoadSandBox();
			};
			
			async Execute(obj={}){
				try{
					const json = this.LoadSandBox({
						...obj,
						
						Project: this.Project,
						//Controller: this.Project.Controller,
						//Core: this.Project.Core,
						//Library: this.Project.Library,
						//Service: this.Project.Service,
						
						Queue,
						..._GLOBAL,
					});
					this[_startTime] = (new Date()).getTime();
					this[_status] = "S";
					this[_active] = true;
					this[data_] = json;
					return json;
				}catch(e){
					Adapter.Report({
						Type: "Error",
						Message: "Module " + this.Type + " => " + this.Name + " [" + this.Path + "]",
						Root: e,
					});
					return e;
				}
			};
			
			//Serialize(){};
		};
	};
})(ATA());