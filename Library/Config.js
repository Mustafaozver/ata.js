module.exports=((ATA)=>{
	const Path = "./Config/";
	
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
			
			/*
			get Content(){
				if(this[data])return this[data];
				else return this.LoadRoot();
			};
			*/
			
			/*
			LoadRoot(){
				return this.LoadSandBox();
			};
			*/
			
			get Return(){
				return this[data];
			};
			
			async Execute(obj={}){
				try{
					const json = await this.LoadSandBox({
						Import: this.Import,
						Inject: this.Inject,
						...obj,
						console,
						setTimeout,
					});
					console.log("CONFIG ALOOO LOOOOO => ", json);
					/*
					const json = await this.LoadRoot({
						Import: this.Import,
						Inject: this.Inject,
						...obj,
						console,
						setTimeout,
					});
					*/
					this.OK(json);
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
			/*
			LoadSandBox(){
				try{
					const json = Check(this.LoadJSON(this.Path));
					this[data] = json;
					this.OK(json);
					return json;
				}catch(e){
					this.NO(e);
					console.log(e);
					Adapter.Report({
						Type: "Error",
						Message: "Module " + this.Type + " => " + this.Name + " [" + this.Path + "]",
						Root: e,
					});
					return e;
				}
			};
			*/
		};
	};
})(ATA());