module.exports=((ATA)=>{
	const Path = "./InterFace/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "InterFace";
			};
		};
	};
})(ATA());