module.exports=((ATA)=>{
	const Path = "./Job/";
	
	const controller = Symbol();
	const ldr = Symbol();
	
	const Loader = (class_, config)=>{
		return async()=>{
			const resp = await config.Project.Execute(config.Name);
			class_[ldr] = resp;
			class_.Environment = config.Environment;
			class_.Project.Environment = config.Environment;
			return true;
		};
	};
	
	return(class_, Adapter)=>{
		const data = Symbol();
		return class extends class_{
			static Path = Path;
			[data] = null;
			[controller] = null;
			[ldr] = null;
			Environment = null;
			OnData = null;
			Send = null;
			constructor(config){
				super({
					Path,
					...config,
				});
				this[ldr] = Loader(this, config);
				this.Environment = {...config.Environment};
				this.OnData = ()=>{};
				this.Send = ()=>{};
			};
			
			get Type(){
				return "Job";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			get Return(){
				return this[data];
			};
			
			async Execute(){
				try{
					const json = this.LoadRoot({ // 
						console,
						
					});
					this[ldr]();
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