module.exports=((ATA)=>{
	const Path = "./Library/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Library";
			};
		};
	};
})(ATA());