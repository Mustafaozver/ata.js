module.exports=((ATA)=>{
	const Path = "./Job/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Job";
			};
		};
	};
})(ATA());