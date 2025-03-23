module.exports=((ATA)=>{
	const Path = "./Document/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "Document";
			};
		};
	};
})(ATA());