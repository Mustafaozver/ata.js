module.exports=((ATA)=>{
	const Path = "./Library/";
	const data = Symbol();
	
	return(class_)=>{
		return class extends class_{
			[data] = null;
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "Library";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			get Return(){
				return this[data];
			};
			
			async Execute(){
				try{
					const json = this.LoadRoot();
					this[data] = json;
					return json;
				}catch(e){
					return e;
				}
			};
		};
	};
})(ATA());