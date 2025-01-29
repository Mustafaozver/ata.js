module.exports=(()=>{
	
	const GeneratePackageJSON = ()=>{
		
	};
	
	const GenerateMeJSON = ()=>{
		
	};
	
	const Stack = (()=>{
		const class_ = Symbol();
		const arr_ = Symbol();
		const Class = class{
			[class_] = null;
			[arr_] = {};
			constructor(class__) {
				this[class_] = class__;
			};
			Add(name, config={}){
				const obj = new this[class_](config);
				this[arr_][name+""] = obj;
				return obj;
			};
			Get(name){
				return this[arr_][name];
			};
			get List(){
				return Object.values(this[arr_]);
			};
		};
		
		return Class;
	})();
	
	const Class = (()=>{
		const Class = class{
			constructor(){
				
			};
			toString(){
				return"[PROJECT OBJECT]";
			};
			valueOf(){
				return this.toString();
			};
			Serialize(){
				return{};
			};
		};
		
		return Class;
	})();
	
	const Project = (()=>{
		const path = Symbol();
		const name = Symbol();
		const Class = class{
			[path] = "";
			[name] = "";
			constructor(config={}){
				this[name] = config.Name;
				this[path] = config.Path;
			};
			
			get Path(){
				return this[path];
			};
			
			get Name(){
				return this[name];
			};
		};
		
		return Class;
	})();
	
	return{
		Class,
		Project,
		Stack,
	};
})(ATA());