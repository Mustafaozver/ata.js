module.exports=((ATA)=>{
	const Path = "./Extension/";
	
	const ldr = Symbol();
	
	const Loader = (class_, config)=>{
		return()=>{
			const folder = ATA.Path.join(config.Directory, config.Name);
		};
	};
	
	return(class_, Adapter)=>{
		const data = Symbol();
		return class extends class_{
			static Path = Path;
			[ldr] = null;
			[data] = null;
			constructor(config){
				super({
					Path,
					...config,
				});
				this[ldr] = Loader(this, config);
			};
			
			get Type(){
				return "Extension";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + "/Index.js");
			};
			
			get Return(){
				return this[data];
			};
			
			async Execute(obj={}){
				try{
					const json = this.LoadRoot({
						Import: this.Import,
						Inject: this.Inject,
						console,
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