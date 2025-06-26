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
	};
})(ATA());