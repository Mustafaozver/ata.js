module.exports=((ATA)=>{
	const Path = "./Config/";
	
	const LoadJSON = (path)=>{
		return JSON.parse(ATA.FS.readFileSync(path, {
			"encoding": "utf8",
		}));
	};
	
	return(class_)=>{
		const data = Symbol();
		return class extends class_{
			[data] = null;
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Config";
			};
			
			LoadRoot(){
				return this.LoadSandBox();
			};
			
			LoadSandBox(){
				try{
					const json = LoadJSON(this.Path);
					this[data] = json;
					this.Promise.resolve(json);
					return json;
				}catch(e){
					this.Promise.reject(e);
					return e;
				}
			};
		};
	};
})(ATA());