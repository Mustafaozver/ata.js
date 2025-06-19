module.exports=((ATA)=>{
	const Path = "./Service/";
	const data_ = Symbol();
	
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
			console.log("SERVICE => ", {
				data
			});
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
	
	return(class_)=>{
		return class extends class_{
			static Path = Path;
			[data_] = null;
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
				return this[data];
			};
			
			get Type(){
				return "Service";
			};
			
			get Active(){
				//...
			};
			
			get Status(){
				//...
			};
			
			get Library(){
				return this.super.Project.Library;
			};
			
			get Controller(){
				return this.super.Project.Controller;
			};
			
			LoadRoot(){
				return this.LoadSandBox();
			};
			
			async Execute(obj={}){
				try{
					const json = this.LoadSandBox({
						Import: this.Import,
						Inject: this.Inject,
						...obj,
						
						Module: false,
						
						Controller: this.Project.Controller,
						Core: this.Project.Core,
						Library: this.Project.Library,
						Service: this.Project.Service,
						
						Queue,
						setTimeout,
						console,
					});
					this[data_] = json;
					return json;
				}catch(e){
					return e;
				}
			};
		};
	};
})(ATA());