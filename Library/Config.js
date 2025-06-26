module.exports=((ATA)=>{
	const Path = "./Config/";
	
	const Check = (data)=>{
		try{
			return JSON.parse(JSON.stringify(data));
		}catch(e){
			throw e;
		}
	};
	
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
				return "Config";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			get Content(){
				if(this[data])return this[data];
				else return this.LoadRoot();
			};
			
			LoadRoot(){
				return this.LoadSandBox();
			};
			
			LoadSandBox(){
				try{
					const json = Check(this.LoadJSON(this.Path));
					this[data] = json;
					this.OK(json);
					return json;
				}catch(e){
					this.NO(e);
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