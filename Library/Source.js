module.exports=((ATA)=>{
	const Path = "./Source/";
	
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
				return "Source";
			};
		};
	};
})(ATA());