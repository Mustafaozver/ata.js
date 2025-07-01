// Application runs after Needed Services are prepared
// Default Application, runs auto on Run mode

return(()=>{
	// Create scope
	
	Setup(()=>{
		// Setup runs on startup
		
		// Initialize Program
		// ...
		
		OK();
	});
	
	Loop(()=>{
		// Loop runs on every loop
		// Routine checks if the program is running and everything is OK.
		
	});
	
	return{
		// Return of Result
	};
})();
