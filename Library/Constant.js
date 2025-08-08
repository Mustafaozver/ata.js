module.exports=((ATA)=>{
	const Path = "./Constant/";
	
	
	
	
	const Check = (data)=>{
		try{
			return JSON.parse(JSON.stringify(data));
		}catch(e){
			//throw e;
			console.warn(e);
		}
		throw new Error("Invalid Config File");
	};
	
	const FixFormat = (data)=>{
		return{
			//...
			isWrite: true,
			lastWrite: (new Date()).getTime(),
			
			...data,
		}
	};
	
	return(class_, Adapter)=>{
		const data = Symbol();
		const isWrite = Symbol();
		const lastWrite = Symbol();
		
		return class extends class_{
			static Path = Path;
			[data] = null;
			[isWrite] = false;
			[lastWrite] = 0;
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "Constant";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".json");
			};
			
			get Content(){
				if(this[data])return this[data];
				else return this.LoadRoot();
			};
			
			get Export(){
				return this[data];
			};
			
			get Return(){
				return this.Export;
			};
			
			Set(key="", value=false){
				try{
					this[data]["" + key] = value;
				}catch(e){
					Adapter.Report({
						Type: "Error",
						Message: "Module " + this.Type + " => " + this.Name + " [" + this.Path + "]\nSET KEY-VALUE error",
						Root: e,
					});
					return e;
				}
			};
			
			Get(key=""){
				try{
					return this[data]["" + key];
				}catch(e){
					Adapter.Report({
						Type: "Error",
						Message: "Module " + this.Type + " => " + this.Name + " [" + this.Path + "]\nGET KEY error",
						Root: e,
					});
					return e;
				}
			};
			
			Save(){
				if(!this[isWrite])return;
				ATA.FS.writeFileSync(this.Path, JSON.stringify(FixFormat(this[data]), null, "\t"));
			};
			
			LoadRoot(){
				return this.LoadSandBox();
			};
			
			LoadSandBox(){
				try{
					const json = Check(this.LoadJSON(this.Path));
					this[data] = json;
					if(json.isWrite)this[isWrite] = true;
					this[lastWrite] = json.lastWrite;
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
			
			Execute(){
				try{
					//const json = this.LoadSandBox();
					return this.LoadRoot();
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