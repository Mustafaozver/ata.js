module.exports=((ATA)=>{
	
	const { Class, Project, Stack } = ATA.Require("./Library/Project.js");
	const { RunJS, RunTS, Require } = ATA.SandBox;
	
	const PushSetup = (f=()=>{})=>{
		ATA.Setups.push(()=>{
			f();
		});
	};
	
	const PushLoop = (f=()=>{})=>{
		ATA.Loops.push((time)=>{
			f(time);
		});
	};
	
	const LoadJSON = (path)=>{
		return JSON.parse(ATA.FS.readFileSync(path, {
			"encoding": "utf8",
		}));
	};
	
	const CompileTS = async(code)=>{
		// TODO: Compile TS
		return code;
	};
	
	ANA.System = {
		Class:{},
		
	};
	
	const extendedClass = ((class_)=>{
		
		const CreatePromise = (class_)=>{
			const asp = {};
			asp.promise = new Promise((resolve, reject)=>{
				asp.resolve = resolve;
				asp.reject = reject;
			});
			asp.promise.then((data)=>{
				class_[isReady] = true;
				class_[exports] = data;
			});
			return asp;
		};
		
		const isReady = Symbol();
		const promise = Symbol();
		const project = Symbol();
		const exports = Symbol();
		const name = Symbol();
		const path = Symbol();
		
		const Class = class extends class_{
			ATA = ATA;
			[isReady] = false;
			[promise] = null;
			[project] = null;
			[exports] = null;
			[name] = "";
			[path] = "";
			Initialize = null;
			
			constructor(config){
				super(config);
				this[name] = config.Name;
				this[path] = config.Path;
				this[promise] = CreatePromise(this);
				this[project] = config.Project;
				this[isReady] = false;
				this.Initialize = async()=>{};
			};
			
			get Type(){
				return "ETC";
			};
			
			get Name(){
				return this[name];
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name);
			};
			
			get Directory(){
				return ATA.Path.join(/*ATA.CWD, */this[path]);
			};
			
			get Export(){
				if(this[isReady])return this[exports];
				//return null;
				throw new Error("Module not ready" + this.Name);
			};
			
			get Content(){
				return CompileTS(this.Code);
			};
			
			get Code(){
				try{
					return ATA.FS.readFileSync(this.Path, {
						"encoding": "utf8",
						//"flag": "r",
						//"mode": 0o666,
						//"autoClose": true,
					});
				}catch(e){
					console.log(this.Type + " Module not found " + this.Path + "");
					throw new Error(this.Type + " Module not found " + this.Path + "");
				}
			};
			
			get Promise(){
				return this[promise].promise;
			};
			
			get Project(){
				return this[project];
			};
			
			OK(){
				return this[promise].resolve.apply(this[promise].promise, [...arguments]);
			};
			
			NO(){
				return this[promise].reject.apply(this[promise].promise, [...arguments]);
			};
			
			async Import(path, obj={}){
				return this.Project.Import(ATA.Path.join(this.Directory, path), {
					//Module: this,
					//Project: this.Project,
					...obj,
				});
			};
			
			async Inject(content="", obj={}){
				return this.Project.LoadSandBox(content, {
					...obj,
				});
			};
			
			async LoadRoot(obj={}){
				return this.Project.LoadRoot(await this.Content, {
					Module: this,
					OK: this[promise].resolve,
					NO: this[promise].reject,
					...obj,
				});
			};
			
			async LoadSandBox(obj={}){
				return this.Project.LoadSandBox(await this.Content, {
					Module: this,
					OK: this[promise].resolve,
					NO: this[promise].reject,
					...obj,
				});
			};
			
			LoadJSON(path){
				return this.Project.LoadJSON(path);
			};
		};
		
		return Class;
	})(Class);
	
	const extendedProject = ((class_)=>{
		const MODNAME = Symbol();
		const Class = class extends class_{
			Application = null;
			Config = null;
			Constant = null;
			//Container = null;
			Controller = null;
			Core = null;
			DataBase = null;
			//Development = null;
			Document = null;
			Extension = null;
			//ETC = null;
			//Event = null;
			//Helper = null;
			InterFace = null;
			Job = null;
			//Key = null;
			//Locale = null;
			Library = null;
			Log = null;
			//Meta = null;
			Mod = null;
			//Queue = null;
			Service = null;
			Source = null;
			//Temporary = null;
			Template = null;
			Version = null;
			
			[MODNAME] = "";
			
			constructor(config){
				super({
					...config,
				});
				
				this.Application = new Stack(Application, this, { Project: this });
				this.Config = new Stack(Config, this, { Project: this });
				this.Constant = new Stack(Constant, this, { Project: this });
				//this.Container = new Stack(Container, this, { Project: this });
				this.Controller = new Stack(Controller, this, { Project: this });
				this.Core = new Stack(Core, this, { Project: this });
				this.DataBase = new Stack(DataBase, this, { Project: this });
				//this.Development = new Stack(Development, this, { Project: this });
				this.Document = new Stack(Document, this, { Project: this });
				this.Extension = new Stack(Extension, this, { Project: this });
				//this.ETC = new Stack(ETC, this, { Project: this });
				//this.Event = new Stack(Event, this, { Project: this });
				//this.Helper = new Stack(Helper, this, { Project: this });
				this.InterFace = new Stack(InterFace, this, { Project: this });
				this.Job = new Stack(Job, this, { Project: this });
				//this.Key = new Stack(Key, this, { Project: this });
				//this.Locale = new Stack(Locale, this, { Project: this });
				this.Library = new Stack(Library, this, { Project: this });
				this.Log = new Stack(Log, this, { Project: this });
				//this.Meta = new Stack(Meta, this, { Project: this });
				this.Mod = new Stack(Mod, this, { Project: this });
				//this.Queue = new Stack(Queue, this, { Project: this });
				this.Service = new Stack(Service, this, { Project: this });
				this.Source = new Stack(Source, this, { Project: this });
				//this.Temporary = new Stack(Temporary, this, { Project: this });
				//this.Template = new Stack(Template, this, { Project: this });
				
				this.Version = new Version(config.Version);
			};
			
			get ModName(){
				return this[MODNAME];
			};
			
			
			
			LoadRoot(content, obj={}){
				return this.LoadSandBox(content, {
					Project: this,
					Require,
					GLOBAL: ATA.GLOBAL,
					ATA: ATA.GLOBAL.ATA,
					...obj,
				});
			};
			
			LoadSandBox(content, obj={}){
				return RunJS(content, {
					RunJS,
					RunTS,
					Setup: PushSetup,
					Loop: PushLoop,
					...obj,
				}, []);
			};
			
			LoadJSON(path){
				try{
					return LoadJSON(path);
				}catch(e){
					console.log("Module not found " + path);
					throw new Error("Module not found " + path);
				}
			};
			
			async Import(path, obj={}){
				try{
					return this.Inject(ATA.FS.readFileSync(path, {
						"encoding": "utf8",
						//"flag": "r",
						//"mode": 0o666,
						//"autoClose": true,
					}), {
						...obj,
					});
				}catch(e){
					console.log("File not load on Module (" + this.Name + ") => " + path);
					throw new Error("File not load on Module (" + this.Name + ") => " + path);
				}
			};
			
			async Inject(content="", obj={}){
				return this.LoadSandBox(content, {
					...obj,
				});
			};
			
			async Execute(name=""){
				this[MODNAME] = name;
				const mod = this.Mod.Get(name);
				const {THREAD, RESTART, Environment, Config, Constant, Library, Controller, Service} = await mod.Content;
				
				const configKeys = Object.keys(Config);
				const constantKeys = Object.keys(Constant);
				const libraryKeys = Object.keys(Library);
				const controllerKeys = Object.keys(Controller);
				const serviceKeys = Object.keys(Service);
				//const jobKeys = Object.keys(Job);
				
				for(let i=0; i<configKeys.length; i++){
					const Name = Config[configKeys[i]];
					this.Config.Add(configKeys[i], {
						Name,
					});
				}
				
				for(let i=0; i<constantKeys.length; i++){
					const Name = Constant[constantKeys[i]];
					this.Constant.Add(constantKeys[i], {
						Name,
					});
				}
				
				for(let i=0; i<libraryKeys.length; i++){
					const Name = Library[libraryKeys[i]];
					this.Library.Add(libraryKeys[i], {
						Name,
					});
				}
				
				for(let i=0; i<controllerKeys.length; i++){
					const Name = Controller[controllerKeys[i]];
					this.Controller.Add(controllerKeys[i], {
						Name,
					});
				}
				
				for(let i=0; i<serviceKeys.length; i++){
					const Name = Service[serviceKeys[i]];
					this.Service.Add(serviceKeys[i], {
						Name,
					});
				}
				
				/*for(let i=0; i<jobKeys.length; i++){
					const Name = Job[jobKeys[i]];
					this.Job.Add(jobKeys[i], {
						Name,
					});
				}*/
				
				this.Controller.Add("DEV", {
					Name: "DEV",
					Path: ATA.Path.join(ATA.MWD, "Controller"),
				});
				
				return this.Service.Default.Execute();
				
				const Main = this.Controller.Get(name);
				const CM = this.Controller.Get("DEV");
				
				await CM.Execute();
				await CM.Promise;
				
				await Main.Execute();
				await Main.Promise;
				
				const f = CM.Path;
				
				const { Return: MRETURN, Export: MEXPORT } = Main;
				const { Return: CRETURN, Export: CEXPORT } = CM;
				
				/*
				const core = this.Core.Add("THREAD1", {
					Name: "THREAD1",
					
				});
				*/
			};
		};
		
		return Class;
	})(Project);
	
	const Application = ATA.Require("./Library/Application.js")(extendedClass);
	const Config = ATA.Require("./Library/Config.js")(extendedClass);
	const Constant = ATA.Require("./Library/Constant.js")(extendedClass);
	//const Container = ATA.Require("./Library/Container.js")(extendedClass);
	const Controller = ATA.Require("./Library/Controller.js")(extendedClass);
	const Core = ATA.Require("./Library/Core.js")(extendedClass);
	const DataBase = ATA.Require("./Library/DataBase.js")(extendedClass);
	//const Development = ATA.Require("./Library/Development.js")(extendedClass);
	const Document = ATA.Require("./Library/Document.js")(extendedClass);
	const Extension = ATA.Require("./Library/Extension.js")(extendedClass);
	//const ETC = ATA.Require("./Library/ETC.js")(extendedClass);
	//const Event = ATA.Require("./Library/Event.js")(extendedClass);
	//const Helper = ATA.Require("./Library/Helper.js")(extendedClass);
	const InterFace = ATA.Require("./Library/InterFace.js")(extendedClass);
	const Job = ATA.Require("./Library/Job.js")(extendedClass);
	//const Key = ATA.Require("./Library/Key.js")(extendedClass);
	//const Locale = ATA.Require("./Library/Locale.js")(extendedClass);
	const Library = ATA.Require("./Library/Library.js")(extendedClass);
	const Log = ATA.Require("./Library/Log.js")(extendedClass);
	//const Meta = ATA.Require("./Library/Meta.js")(extendedClass);
	const Mod = ATA.Require("./Library/Mod.js")(extendedClass);
	//const Queue = ATA.Require("./Library/Queue.js")(extendedClass);
	const Service = ATA.Require("./Library/Service.js")(extendedClass);
	const Source = ATA.Require("./Library/Source.js")(extendedClass);
	//const Temporary = ATA.Require("./Library/Temporary.js")(extendedClass);
	//const Template = ATA.Require("./Library/Template.js")(extendedClass);
	
	const { Version } = ATA.Require("./Library/Version.js");
	
	Object.assign(ANA.System.Class, {
		Application,
		Config,
		Constant,
		Controller,
		Core,
		DataBase,
		Document,
		Extension,
		InterFace,
		Job,
		Library,
		Log,
		Mod,
		Service,
		Source,
		
	});
	
	return{
		extendedProject,
	};
})(ATA());