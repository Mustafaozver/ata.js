module.exports=((ATA)=>{
	const Path = "./DB/";
	
	return(class_, Adapter)=>{
		return class extends class_{
			static Path = Path;
			
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "DataBase";
			};
		};
	};
})(ATA());