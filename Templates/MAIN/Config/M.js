// 

(()=>{
	const config = {
		"Config0": 1453,
		"Config1": "Config1",
		"Config2": [
			"Config2-1",
			"Config2-2"
		],
		"Config3": {
			"Config3-1-key": "Config3-1-value",
			"Config3-2-key": "Config3-2-value"
		}
	};
	
	Setup(()=>{
		OK(config);
	});
	
	return config;
})();