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
				console.log("33");
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
			
			async Execute(obj={}){
				try{
					const json = this.LoadRoot({
						Import: this.Import,
						Inject: this.Inject,
						...obj,
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