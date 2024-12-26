module.exports=((ATA)=>{
	const Path = "./Config/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Config";
			};
		};
	};
})(ATA());