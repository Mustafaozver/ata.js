module.exports=((ATA)=>{
	const Path = "./Source/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "Source";
			};
		};
	};
})(ATA());