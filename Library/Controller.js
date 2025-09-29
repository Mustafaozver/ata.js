module.exports=((ATA)=>{
	const Path = "./Controller/";
	
	const GenerateFunction = (func, obj={})=>{
		return function(){
			return func.apply(obj, [...arguments]);
		};
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
				return "Controller";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			get Directory(){
				return ATA.Path.join(super.Directory, this.Name);
			};
			
			get Return(){
				return this[data];
			};
			
			async Import(path, obj={}){
				return await super.Import(ATA.Path.join(ATA.CWD, this.Directory, path), obj);
			};
			
			async Execute(obj={}){
				try{
					//const json = this.LoadSandBox();
					const json = await this.LoadRoot({
						Import: GenerateFunction(this.Import, this),
						Inject: GenerateFunction(this.Inject, this),
						...obj,
						console,
						setTimeout,
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
