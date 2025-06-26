module.exports=((ATA)=>{
	const Path = "./Document/";
	
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
				return "Document";
			};
		};
	};
})(ATA());