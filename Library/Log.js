module.exports=((ATA)=>{
	const Path = "./Log/";
	
	const noop = ()=>{return false};
	
	return(class_, Adapter)=>{
		const _Log = Symbol();
		const _Warn = Symbol();
		const _Error = Symbol();
		const _Info = Symbol();
		const _DeBug = Symbol();
		
		return class extends class_{
			static Path = Path;
			
			[_Log] = null;
			[_Warn] = null;
			[_Error] = null;
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "Log";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			LoadRoot(obj={}){
				return this.LoadSandBox(obj);
			};
			
			async LoadSandBox(obj={}){
				try{
					const functions = await super.LoadSandBox({
						...obj,
						console,
						stdout: process.stdout,
						stderr: process.stderr,
					});
					
					this[_Log] = functions.Log || noop;
					this[_Warn] = functions.Warn || false;
					this[_Error] = functions.Error || false;
					this[_Info] = functions.Info || false;
					this[_DeBug] = functions.DeBug || false;
					
					this.OK(functions);
					return functions;
				}catch(e){
					this.NO(e);
					return e;
				}
			};
			
			async Execute(obj={}){
				await this.LoadSandBox(obj);
			};
			
			Log(){
				const now = new Date();
				return this[_Log].apply(this.Project, ["LOG", now, ...arguments]);
			};
			
			Warn(){
				const now = new Date();
				if(this[_Warn])return this[_Warn].apply(this.Project, [now, ...arguments]);
				else return this[_Log].apply(this.Project, ["WARN", now, ...arguments]);
			};
			
			Error(){
				const now = new Date();
				if(this[_Error])return this[_Error].apply(this.Project, [now, ...arguments]);
				else return this[_Log].apply(this.Project, ["ERROR", now, ...arguments]);
			};
			
			Info(){
				const now = new Date();
				if(this[_Info])return this[_Info].apply(this.Project, [now, ...arguments]);
				else return this[_Log].apply(this.Project, ["INFO", now, ...arguments]);
			};
			
			DeBug(){
				const now = new Date();
				if(this[_DeBug])return this[_DeBug].apply(this.Project, [now, ...arguments]);
				else return this[_Log].apply(this.Project, ["DEBUG", now, ...arguments]);
			};
			
			//Serialize(){};
		};
	};
})(ATA());