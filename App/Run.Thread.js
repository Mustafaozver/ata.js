((ATA) => {
	const Terminal = ATA.Require("./Library/Terminal.js");
	
	const CWD = ATA.CWD;
	const MWD = ATA.MWD;
	
	process["__MODE"] = "THREAD";
	
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
	
	const Depack = (str)=>{
		return JSON.parse(Buffer.from(str, "base64").toString());
	};
	
	const Setup = async()=>{
		const { Module, Project, Environment } = Depack(("" + process.env.Opts));
		
		const project = new extendedProject({
			...MJSON,
			Path: ATA.Path.join(ATA.CWD, "./"),
			Environment: {
				...Environment,
				Dependency,
				Main,
			},
		});
		
		project.Mod.Add(Module.Name, {
			Name: Module.Name + ".json",
		});
		
		const job = project.Job.Add(Module.Name, {
			Name: Module.Name,
			Module,
			Project,
			Environment,
			Terminal,
		});
		
		job.Send = function(){
			process.send.apply(process, [...arguments]);
		};
		
		await job.Execute({
			//Terminal,
		});
		
		await job.Promise;
		
		job.Send({
			Method: "READY"
		});
		
		const { Return, Export } = job;
		
		process.on("message", (data)=>{
			job.OnData({...data});
		});
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
})(require("../Core/Ata.js")());