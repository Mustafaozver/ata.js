module.exports=((ATA)=>{
	const Path = "./InterFace/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "InterFace";
			};
		};
	};
})(ATA());