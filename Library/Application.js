module.exports=((ATA)=>{
	const Path = "./App/";
	
	return(class_, Adapter)=>{
		const data = Symbol();
		return class extends class_{
			static Path = Path;
			[data] = null;
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "Application";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name);
			};
			
			get Return(){
				return this[data];
			};
			
			async Execute(obj={}){
				try{
					//const json = this.LoadSandBox();
					const json = await this.LoadRoot({
						...obj,
						console,
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
		};
	};
})(ATA());