((ATA)=>{
	const Terminal = ATA.Require("./Library/Terminal.js");
	
	process["__MODE"] = "RUN";
	
	const packageJSON = ATA.Require(ATA.Path.join(ATA.CWD, "./package.json"));
	const MJSON = ATA.Require(ATA.Path.join(ATA.CWD, "./Config/M.json"));
	const packageJSON_ATA = ATA.Require(ATA.Path.join(ATA.MWD, "./package.json"));
	
	const {
		extendedProject,
	} = ATA.Require(ATA.Path.join(ATA.MWD, "./Core/Main.js"));
	
	const Dependency = {
		...(packageJSON.dependencies || {}),
		...(packageJSON.devDependencies || {}),
		//...(packageJSON_ATA.dependencies || {}),
		//...(packageJSON_ATA.devDependencies || {}),
	};
	
	const Main = packageJSON.main || false;
	
	const Environment = {
		Dependency,
		Main
	};
	
	const project = new extendedProject({
		...MJSON,
		Path: ATA.Path.join(ATA.CWD, "./"),
		Environment,
	});
	
	project.Mod.Add("Run", {
		Name: "Run.json",
		//Path: "./Mod/Run.json",
	});
	
	project.Execute("Run", {
		Terminal,
	}).then(()=>{
		//console.log("tamam\n");
	});
	
})(ATA());