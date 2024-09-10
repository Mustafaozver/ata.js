module.exports = ((ATA)=>{
	return(_class)=>{
		
		const Library = class extends _class{
			constructor(){
				
			};
		};
		
		const Controller = class extends _class{
			constructor(){
				
			};
		};
		
		const Service = class extends _class{
			constructor(){
				
			};
		};
		
		return{
			//...
			Library,
			Controller,
			Service,
		};
	};
})(ATA());