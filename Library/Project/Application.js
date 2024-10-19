module.exports = ((ATA)=>{
	return(_class)=>{
		return class extends _class{
			constructor(name){
				super(name);
			};
			get Type(){
				return "App";
			};
		};
	};
})(ATA());