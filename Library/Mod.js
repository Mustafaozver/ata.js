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
	
	return(class_)=>{
		const data = Symbol();
		return class extends class_{
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
					return e;
				}
			};
		};
	};
})(ATA());