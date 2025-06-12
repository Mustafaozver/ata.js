module.exports=((ATA)=>{
	
	const GeneratePackageJSON = ()=>{
		
	};
	
	const GenerateMeJSON = ()=>{
		
	};
	
	const Stack = (()=>{
		const class_ = Symbol();
		const config_ = Symbol();
		const project_ = Symbol();
		const arr_ = Symbol();
		const Class = class{
			[class_] = null;
			[config_] = null;
			[project_] = null;
			[arr_] = {};
			
			constructor(class__, project, config={}) {
				this[class_] = class__;
				this[config_] = config;
				this[project_] = project;
			};
			
			Add(name, config={}){
				const obj = new this[class_]({
					...config,
					...this[config_],
				});
				this[arr_][name+""] = obj;
				return obj;
			};
			
			Get(name){
				if(this[arr_][name])return this[arr_][name];
				else throw new Error("UnKnown Object! " + name);
			};
			
			get List(){
				return Object.values(this[arr_]);
			};
			
			get NameList(){
				return Object.keys(this[arr_]);
			};
			
			get Default(){
				try{
					return this[arr_]["Default"];
					//return this[arr_][this[project_].ModName];
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