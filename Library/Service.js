module.exports=((ATA)=>{
	const Path = "./Service/";
	
	ATA.Service = {
		Get: null,
	};
	
	const stack = {};
	
	Object.defineProperty(ATA.Service, "Get", {
		get: ()=>{
			return(name)=>{
				return stack[name];
			};
		}
	});
	
	const Loader = (class_, config)=>{
		stack[config.Name] = class_.Export;
	};
	
	return(class_)=>{
		return class extends class_{
			static Path = Path;
			
			constructor(config){
				super({
					Path,
					...config,
				});
				Loader(this, config);
			};
			
			get Type(){
				return "Service";
			};
		};
	};
})(ATA());