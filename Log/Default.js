// The Default Beta Log Script

return((ATA)=>{
	
	// 09-21-2024 18:01:09.143 [LOG] info HTTP server on :::8080
	
	const Log = (type, time, ...args)=>{
		switch(type){
			default:
				//console.log(" => ", time, ...args);
			break;
			case"LOG":
				console.log(time.toLocaleString(), "[LOG]", ...args);
			break;
			case"WARN":
				console.warn(time.toLocaleString(), "[WARN]", ...args);
			break;
			case"ERROR":
				console.error(time.toLocaleString(), "[ERROR]", ...args);
			break;
			case"INFO":
				console.info(time.toLocaleString(), "[INFO]", ...args);
			break;
			case"DEBUG":
				console.log(time.toLocaleString(), "[DEBUG]", ...args);
			break;
		}
		
		return true;
	};
	
	const Warn = (time, ...args)=>{
		return Log("WARN", time, ...args);
	};
	
	const Error = (time, ...args)=>{
		return Log("ERROR", time, ...args);
	};
	
	const Info = (time, ...args)=>{
		return Log("INFO", time, ...args);
	};
	
	const DeBug = (time, ...args)=>{
		return Log("DEBUG", time, ...args);
	};
	
	return{
		Log,
		Warn,
		Error,
		Info,
		DeBug,
	};
})(ATA());