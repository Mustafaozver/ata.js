module.exports=((ATA)=>{
	const TimeFunctions = {
		setTimeout,
		setInterval,
		setImmediate,
		clearTimeout,
		clearInterval,
		clearImmediate,
	};
	
	const GenerateGlobal = ()=>{
		const _global = {};
		if(typeof process !== "undefined")_global.process = process;
		if(typeof console !== "undefined")_global.console = console;
		if(typeof window !== "undefined")_global.window = window;
		if(typeof Deno !== "undefined")_global.Deno = Deno;
		if(typeof Bun !== "undefined")_global.Bun = Bun;
		return _global;
	};
	
	const GetNativeModule = (name)=>{
		if(typeof process !== "undefined")return require("node:" + name);
		if(typeof Deno !== "undefined")return import(name);
		if(typeof Bun !== "undefined")return require("node:" + name);
		if(typeof window !== "undefined")return window[name];
	};
	
	const GenerateServiceGlobal = ()=>{
		return{
			...TimeFunctions,
			...GenerateGlobal(),
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
	
	return{
		GenerateServiceGlobal,
		Report,
		GetNativeModule,
	};
})(ATA());