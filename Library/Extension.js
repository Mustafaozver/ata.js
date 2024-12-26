module.exports=((ATA)=>{
	const Path = "./Extension/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Extension";
			};
		};
	};
})(ATA());