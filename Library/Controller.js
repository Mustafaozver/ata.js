module.exports=((ATA)=>{
	const Path = "./Controller/";
	
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
				return "Controller";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + "/" + this.Name + ".js");
			};
			
			/*get Directory(){
				return ATA.Path.join(super.Directory, this.Name);
			};*/
			
			get Return(){
				return this[data];
			};
			
			async Execute(){
				try{
					//const json = this.LoadSandBox();
					const json = this.LoadRoot({
						Import: this.Import,
						Inject: this.Inject,
						console
					});
					this[data] = json;
					return json;
				}catch(e){
					return e;
				}
			};
		};
	};
})(ATA());