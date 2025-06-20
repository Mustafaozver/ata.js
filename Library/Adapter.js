module.exports=((ATA)=>{
	const GenerateServiceGlobal = ()=>{
		const _global = {};
		if(typeof process !== "undefined")_global.process = process;
		if(typeof console !== "undefined")_global.console = console;
		if(typeof Deno !== "undefined")_global.Deno = Deno;
		if(typeof window !== "undefined")_global.window = window;
		
		_global.setTimeout = setTimeout;
		_global.setInterval = setInterval;
		_global.setImmediate = setImmediate;
		_global.clearTimeout = clearTimeout;
		_global.clearInterval = clearInterval;
		_global.clearImmediate = clearImmediate;
		
		return _global;
	};
	
	return{
		//...
		GenerateServiceGlobal,
	};
})(ATA());