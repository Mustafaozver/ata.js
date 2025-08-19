module.exports=((ATA)=>{
	const TimeFunctions = {
		setTimeout,
		setInterval,
		setImmediate,
		clearTimeout,
		clearInterval,
		clearImmediate,
	};
	
	const GenerateSpecialize = ()=>{
		const GLOBAL = {
			...(ATA.Platform.Detected),
		};
		
		if(ATA.Platform.Detected.isNODE){
			GLOBAL.AllowedModules = {
				"assert": "1.0.0",
				"buffer": "1.0.0",
				"child_process": "1.0.0",
				"cluster": "1.0.0",
				"constants": "1.0.0",
				"crypto": "1.0.0",
				"dgram": "1.0.0",
				"dns": "1.0.0",
				"events": "1.0.0",
				"fs": "1.0.0",
				"http": "1.0.0",
				"https": "1.0.0",
				"inspector": "1.0.0",
				"net": "1.0.0",
				"os": "1.0.0",
				"path": "1.0.0",
				//"readline": "1.0.0",
				"stream": "1.0.0",
				"timers": "1.0.0",
				"tls": "1.0.0",
				"tty": "1.0.0",
				"url": "1.0.0",
				"util": "1.0.0",
				"v8": "1.0.0",
				"vm": "1.0.0",
				"zlib": "1.0.0",
			};
		}
		
		if(ATA.Platform.Detected.isBROWSER){
			GLOBAL.AllowedModules = {
				"fetch": "1.0.0",
				"WebSocket": "1.0.0",
				"XMLHttpRequest": "1.0.0",
				"localStorage": "1.0.0",
				"sessionStorage": "1.0.0",
				"document": "1.0.0",
				"window": "1.0.0",
				"navigator": "1.0.0",
			};
		}
		
		if(ATA.Platform.Detected.isDENO){
			GLOBAL.AllowedModules = {
				"assert": "1.0.0",
				"buffer": "1.0.0",
				"child_process": "1.0.0",
				"cluster": "1.0.0",
				"constants": "1.0.0",
				"crypto": "1.0.0",
				"dgram": "1.0.0",
				"dns": "1.0.0",
				"events": "1.0.0",
				"fs": "1.0.0",
				"http": "1.0.0",
				"https": "1.0.0",
				"inspector": "1.0.0",
				"net": "1.0.0",
				"os": "1.0.0",
				"path": "1.0.0",
				//"readline": "1.0.0",
				"stream": "1.0.0",
				"timers": "1.0.0",
				"tls": "1.0.0",
				"tty": "1.0.0",
				"url": "1.0.0",
				"util": "1.0.0",
				"v8": "1.0.0",
				"vm": "1.0.0",
				"zlib": "1.0.0",
			};
		}
		
		if(ATA.Platform.Detected.isBUN){
			GLOBAL.AllowedModules = {
				"assert": "1.0.0",
				"buffer": "1.0.0",
				"child_process": "1.0.0",
				"cluster": "1.0.0",
				"constants": "1.0.0",
				"crypto": "1.0.0",
				"dgram": "1.0.0",
				"dns": "1.0.0",
				"events": "1.0.0",
				"fs": "1.0.0",
				"http": "1.0.0",
				"https": "1.0.0",
				"inspector": "1.0.0",
				"net": "1.0.0",
				"os": "1.0.0",
				"path": "1.0.0",
				//"readline": "1.0.0",
				"stream": "1.0.0",
				"timers": "1.0.0",
				"tls": "1.0.0",
				"tty": "1.0.0",
				"url": "1.0.0",
				"util": "1.0.0",
				"v8": "1.0.0",
				"vm": "1.0.0",
				"zlib": "1.0.0",
			};
		}
		
		return GLOBAL;
	};
	
	const GenerateGlobal = ()=>{
		const _global = {};
		if(ATA.Platform.Detected.isNODE)_global.process = process;
		if(ATA.Platform.Detected.isBROWSER)_global.window = window;
		if(ATA.Platform.Detected.isDENO)_global.Deno = Deno;
		if(ATA.Platform.Detected.isBUN)_global.Bun = Bun;
		
		if(typeof console !== "undefined")_global.console = console;
		return _global;
	};
	
	const GetNativeModule = (name)=>{
		if(typeof process !== "undefined")return require("node:" + name);
		if(typeof Deno !== "undefined")return import(name);
		if(typeof Bun !== "undefined")return require("node:" + name);
		if(typeof window !== "undefined")return window[name];
	};
	
	const GenerateServiceGlobal = ()=>{
		const GLOBAL = {};
		
		if(ATA.Platform.Detected.isNODE){
			GLOBAL.GLOBAL = process;
		}
		
		if(ATA.Platform.Detected.isBROWSER){
			GLOBAL.GLOBAL = window;
		}
		
		if(ATA.Platform.Detected.isDENO){
			GLOBAL.GLOBAL = Deno;
		}
		
		if(ATA.Platform.Detected.isBUN){
			GLOBAL.GLOBAL = Bun;
		}
		
		return{
			...GenerateGlobal(),
			...TimeFunctions,
			...GLOBAL,
		};
	};
	
	const Report = (data)=>{
		const { Type, Message, Root } = data;
		
		switch(Type){
			case"Error":
				console.error("\n\nERROR");
			break;
		}
		
		console.log(Message);
		console.log(Root.message);
	};
	
	ATA.Setups.push(()=>{
		
	});
	
	return{
		GenerateSpecialize,
		GenerateServiceGlobal,
		Report,
		GetNativeModule,
	};
})(ATA());