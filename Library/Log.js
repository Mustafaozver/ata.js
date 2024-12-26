module.exports=((ATA)=>{
	const Path = "./Log/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "Log";
			};
		};
	};
})(ATA());