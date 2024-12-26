module.exports=((ATA)=>{
	const Path = "./Core/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Core";
			};
		};
	};
})(ATA());