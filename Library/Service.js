module.exports=((ATA)=>{
	const Path = "./Service/";
	
	return(class_)=>{
		return class extends class_{
			
			constructor(config){
				super({
					Path,
					...config,
				});
			};
			
			get Type(){
				return "Service";
			};
		};
	};
})(ATA());