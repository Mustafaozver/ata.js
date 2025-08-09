// RunDefaultLibraryExample.js
// This library file is describing the default library for Run mode (Mod/Run.json).

const Exp = {};

return(()=>{
	
	Exp.Fonk1 = ()=>{
		console.log("RunDefaultLibraryExample => Fonk1");
	};
	
	setTimeout(()=>{
		console.log("RunDefaultLibraryExample => TIMEOUT, ready Library signal, trigger OK");
		OK("OK");
	}, 1000);
	
	return Exp;
})();