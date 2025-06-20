module.exports=(()=>{
	
	const _NODEJS = (ATA, ANA, GLOBAL)=>{
		const process = GLOBAL.process;
		const global = GLOBAL.global;
		
		const setTimeout = GLOBAL.setTimeout;
		const setInterval = GLOBAL.setInterval;
		const setImmediate = GLOBAL.setImmediate;
		
		const clearTimeout = GLOBAL.clearTimeout;
		const clearInterval = GLOBAL.clearInterval;
		const clearImmediate = GLOBAL.clearImmediate;
		
		const queueMicrotask = GLOBAL.queueMicrotask;
		const structuredClone = GLOBAL.structuredClone;
		const atob = GLOBAL.atob;
		const btoa = GLOBAL.btoa;
		const performance = GLOBAL.performance;
		const fetch = GLOBAL.fetch;
		const NAME = GLOBAL.NAME;
		const VERSION = GLOBAL.VERSION;
		const DESCRIPTION = GLOBAL.DESCRIPTION;
		const COPYRIGHT = GLOBAL.COPYRIGHT;
		
		//GLOBAL.global = null;
		//GLOBAL.process = ()=>{return process;};
		//GLOBAL.queueMicrotask = null;
		//GLOBAL.clearImmediate = null;
		//GLOBAL.setImmediate = null;
		//GLOBAL.structuredClone = null;
		//GLOBAL.clearInterval = null;
		//GLOBAL.clearTimeout = null;
		//GLOBAL.setInterval = null;
		//GLOBAL.setTimeout = null;
		//GLOBAL.atob = null;
		//GLOBAL.btoa = null;
		//GLOBAL.performance = null;
		//GLOBAL.fetch = null;
		
		//GLOBAL.global = null;
		//GLOBAL.process = ()=>{return process;};
		//GLOBAL.queueMicrotask = null;
		//GLOBAL.clearImmediate = null;
		//GLOBAL.setImmediate = null;
		//GLOBAL.structuredClone = null;
		//GLOBAL.clearInterval = null;
		//GLOBAL.clearTimeout = null;
		//GLOBAL.setInterval = null;
		//GLOBAL.setTimeout = null;
		//GLOBAL.atob = null;
		//GLOBAL.btoa = null;
		//GLOBAL.performance = null;
		//GLOBAL.fetch = null;
		
		////GLOBAL.Exit = null;
		////GLOBAL.ATA = null;
		////GLOBAL.ANA = null;
		
		const _require = (modnames)=>{
			for(let n=0;n<modnames.length;n++){
				try{
					return require(modnames[n]);
				}catch(e){}
			}
			throw new Error("Module is not loaded.");
			//return false;
		};
		
		process.on("unhandledRejection", function(err){
			console.log("UnHandled Rejection => ", err.toString(), "\n", err);
			//process.exit();
		});
		
		process.on("uncaughtException", function (err) {
			console.log("Caught Exception => ", err.toString(), "\n", err);
			//process.exit();
		});
		
		process.on("message", async (data)=>{
			ATA.OnMessage({ data });
		});
		
		ATA.__reqs = {};
		
		ATA.CWD = process.cwd();
		ATA.Path = require("path");
		ATA.FS = require("fs");
		ATA.MWD = ATA.Path.join(__dirname, "/../");
		
		ATA.Require = (name)=>{ // root
			try{
				if(ATA.__reqs[name])return ATA.__reqs[name];
				const module = _require([
					"node:" + name,
					ATA.Path.join(ATA.CWD, "" + name),
					ATA.Path.join(ATA.MWD, "" + name),
					name
				]);
				return(ATA.__reqs[name] = module);
			}catch(e){
				console.log("Module " + name + " is missing or corrupted.", e);
			}
		};
		
		GLOBAL["ATA"] = ()=>{
			return ATA;
		};
		
		GLOBAL["ANA"] = ()=>{
			return ANA;
		};
	};
	
	const _BROWSER = (ATA, ANA, GLOBAL)=>{
		//...
	};
	
	const _BUN = (ATA, ANA, GLOBAL)=>{
		//...
	};
	
	const _DENO = (ATA, ANA, GLOBAL)=>{
		//...
	};
	
	const _OTHER_PLATFORM = (ATA, ANA, GLOBAL)=>{
		//...
	};
	
	const _ASYNC = (ATA, ANA, GLOBAL)=>{
		//...
	};
	
	return(ATA, ANA, GLOBAL)=>{
		const isBROWSER = (typeof window !== "undefined") && (typeof Deno === "undefined");
		const isDENO = typeof Deno !== "undefined";
		const isNODE = typeof process !== "undefined";
		const isBUN = false;
		
		const isASYNC = typeof Promise !== "undefined";
		
		/*if(isNODE)_NODEJS(ATA, ANA, GLOBAL);
		else if(isBROWSER)_BROWSER(ATA, ANA, GLOBAL);
		else if(isBUN)_BUN(ATA, ANA, GLOBAL);
		else if(isDENO)_DENO(ATA, ANA, GLOBAL);
		else _OTHER_PLATFORM(ATA, ANA, GLOBAL);
		*/
		
		
		//if(isASYNC)_ASYNC(ATA, ANA, GLOBAL);
		// os
	};
})();