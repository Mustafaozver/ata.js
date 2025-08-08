module.exports=((ATA)=>{
	const Path = "./Library/";
	
	const data = Symbol();
	const ldr = Symbol();
	const alloweds = Symbol("ALLOWEDS");
	
	const Loader = (class_, config)=>{
		class_[alloweds] = {
			...(config.Project.Environment.Dependency),
			
		};
	};
	
	return(class_, Adapter)=>{
		
		const Require = (class_, name)=>{
			if(class_[alloweds][name]){
				return ATA.Require(name);
			}
			
			const Root = new Error("External Module Error: " + name + " is not allowed");
			
			Adapter.Report({
				Type: "Error",
				Message: "Module " + class_.Type + " => " + class_.Name + " [" + class_.Path + "]",
				Root,
			});
			
			//throw Root;
			return Root;
		};
		
		return class extends class_{
			static Path = Path;
			[data] = null;
			[ldr] = null;
			[alloweds] = {};
			constructor(config){
				super({
					Path,
					...config,
				});
				
				Loader(this, config);
			};
			
			get Type(){
				return "Library";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			get Return(){
				return this[data];
			};
			
			Require(name=""){
				return Require(this, name);
			}
			
			async Execute(obj={}){
				try{
					const json = this.LoadRoot({
						Import: this.Import,
						Inject: this.Inject,
						Require: this.Require,
						
						Buffer,
						Function,
						
						...obj,
					});
					this[data] = json;
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