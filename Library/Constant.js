module.exports=((ATA)=>{
	const Path = "./Constant/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Constant";
			};
		};
	};
})(ATA());