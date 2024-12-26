module.exports=((ATA)=>{
	
	const { Class, Project, Stack } = ATA.Require("./Library/Project.js");
	
	ANA.System = {
		Class:{},
		
	};
	
	const extendedClass = ((class_)=>{
		
		const CreatePromise = ()=>{
			const asp = {};
			asp.promise = new Promise((resolve, reject)=>{
				asp.resolve = resolve;
				asp.reject = reject;
			});
			return asp;
		};
		
		const isReady = Symbol();
		const promise = Symbol();
		const name = Symbol();
		const path = Symbol();
		
		const Class = class extends class_{
			ATA = ATA;
			[isReady] = false;
			[promise] = null;
			[name] = "";
			[path] = "";
			Initialize = null;
			
			constructor(config){
				super(config);
				this[name] = config.name;
				this[path] = config.path;
				this[promise] = CreatePromise();
				this[isReady] = false;
				this.Initialize = async()=>{};
			};
			
			get Type(){
				return "ETC";
			};
			
			get Path(){
				return ATA.Path.join(/*ATA.CWD, */this[path], this[name]);
			};
		};
		
		return Class;
	})(Class);
	
	const extendedProject = ((class_)=>{
		const Class = class extends class_{
			constructor(config){
				super({
					...config,
				});
				
				this.Application = new Stack(Application);
				this.Config = new Stack(Config);
				this.Constant = new Stack(Constant);
				//this.Container = new Stack(Container);
				this.Controller = new Stack(Controller);
				this.Core = new Stack(Core);
				this.DataBase = new Stack(DataBase);
				//this.Development = new Stack(Development);
				this.Document = new Stack(Document);
				this.Extension = new Stack(Extension);
				//this.ETC = new Stack(ETC);
				//this.Event = new Stack(Event);
				//this.Helper = new Stack(Helper);
				this.InterFace = new Stack(InterFace);
				this.Job = new Stack(Job);
				//this.Key = new Stack(Key);
				//this.Locale = new Stack(Locale);
				this.Library = new Stack(Library);
				this.Log = new Stack(Log);
				//this.Meta = new Stack(Meta);
				//this.Mod = new Stack(Mod);
				//this.Queue = new Stack(Queue);
				this.Service = new Stack(Service);
				this.Source = new Stack(Source);
				//this.Temporary = new Stack(Temporary);
				//this.Template = new Stack(Template);
				
				
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
	//const Mod = ATA.Require("./Library/Mod.js")(extendedClass);
	//const Queue = ATA.Require("./Library/Queue.js")(extendedClass);
	const Service = ATA.Require("./Library/Service.js")(extendedClass);
	const Source = ATA.Require("./Library/Source.js")(extendedClass);
	//const Temporary = ATA.Require("./Library/Temporary.js")(extendedClass);
	//const Template = ATA.Require("./Library/Template.js")(extendedClass);
	
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
		Service,
		Source,
	});
	
	return{
		extendedProject,
	};
})(ATA());