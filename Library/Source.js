module.exports=((ATA)=>{
	const Path = "./Source/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Source";
			};
		};
	};
})(ATA());