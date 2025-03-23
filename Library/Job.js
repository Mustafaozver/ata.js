module.exports=((ATA)=>{
	const Path = "./Job/";
	
	const controller = Symbol();
	const jb = Symbol();
	
	const Loader = (class_, config)=>{
		return async()=>{
			const resp = await config.Project.Execute(config.Name);
			class_[jb] = resp;
			class_.Environment = config.Environment;
			class_.Project.Environment = config.Environment;
			return true;
		};
	};
	
	return(class_)=>{
		const data = Symbol();
		return class extends class_{
			[data] = null;
			[controller] = null;
			[jb] = null;
			Environment = null;
			OnData = null;
			Send = null;
			constructor(config){
				super({
					Path,
					...config,
				});
				this[jb] = Loader(this, config);
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
					this[jb]();
					this[data] = json;
					return json;
				}catch(e){
					return e;
				}
			};
		};
	};
})(ATA());