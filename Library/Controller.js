module.exports=((ATA)=>{
	const Path = "./Controller/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Controller";
			};
		};
	};
})(ATA());