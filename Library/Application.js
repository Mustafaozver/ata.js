module.exports=((ATA)=>{
	const Path = "./App/";
	
	return(class_)=>{
		return class extends class_{
			static Path = Path;
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Application";
			};
		};
	};
})(ATA());