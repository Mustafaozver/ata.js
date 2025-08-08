module.exports=((ATA)=>{
	const Path = "./Mod/";
	
	const Check = (data)=>{
		const {Environment, Config, Constant, Job, Library, Controller, Service} = data;
		if(Environment && Config && Constant && Job && Library && Controller && Service){
			return{
				Environment,
				Config,
				Constant,
				Job,
				Library,
				Controller,
				Service,
			};
		}
		throw new Error("Invalid Mod File");
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
				return "Mod";
			};
			
			get Content(){
				return this.LoadRoot();
			};
			
			LoadRoot(){
				return this.LoadSandBox();
			};
			
			LoadSandBox(){
				try{
					const json = this.LoadJSON(this.Path);
					this[data] = Check(json);
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
			
			//Serialize(){};
		};
	};
})(ATA());