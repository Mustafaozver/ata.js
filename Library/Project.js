module.exports=((ATA)=>{
	
	const GeneratePackageJSON = ()=>{
		
	};
	
	const GenerateMeJSON = ()=>{
		
	};
	
	const Stack = (()=>{
		const class_ = Symbol();
		const default_ = Symbol();
		const config = Symbol();
		const arr_ = Symbol();
		const Class = class{
			[class_] = null;
			[default_] = null;
			[config] = null;
			[arr_] = {};
			
			constructor(class__, config={}) {
				this[class_] = class__;
				this[config] = config;
			};
			
			Add(name, config={}){
				const obj = new this[class_]({
					...config,
					...this[config],
				});
				this[arr_][name+""] = obj;
				if(config.Default)this[default_] = name+"";
				return obj;
			};
			
			Get(name){
				if(this[arr_][name])return this[arr_][name];
				else throw new Error("UnKnown Object! " + name);
			};
			
			get List(){
				return Object.values(this[arr_]);
			};
			
			get Defalut(){
				try{
					return this[arr_][this[default_]];
				}catch(e){
					return null;
				}
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
			Environment = null;
			constructor(config={}){
				this[name] = config.Name;
				this[path] = config.Path;
				this.Environment = {...config.Environment};
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