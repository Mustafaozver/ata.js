module.exports=((ATA)=>{
	const Path = "./Library/";
	const data = Symbol();
	
	const Require = (name)=>{
		require("node:" + name);
	};
	
	return(class_)=>{
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
				return "Library";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			get Return(){
				return this[data];
			};
			
			async Execute(obj={}){
				try{
					const json = this.LoadRoot({
						Import: this.Import,
						Inject: this.Inject,
						Require,
						...obj,
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