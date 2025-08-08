module.exports=((ATA)=>{
	const Path = "./InterFace/";
	
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
				return "InterFace";
			};
			
			//Serialize(){};
		};
	};
})(ATA());