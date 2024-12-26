module.exports=((ATA)=>{
	const Path = "./DB/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					...config,
					path: Path,
				});
			};
			
			get Type(){
				return "DataBase";
			};
		};
	};
})(ATA());