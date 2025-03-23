((ATA)=>{
	const CWD = ATA.CWD;
	const MWD = ATA.MWD;
	
	process["__MODE"] = "THREAD";
	
	const packageJSON = ATA.Require(ATA.Path.join(ATA.CWD, "./package.json"));
	const MJSON = ATA.Require(ATA.Path.join(ATA.CWD, "./Config/M.json"));
	const packageJSON_ATA = ATA.Require(ATA.Path.join(ATA.MWD, "./package.json"));
	
	const {
		extendedProject,
	} = ATA.Require(ATA.Path.join(ATA.MWD, "./Core/Main.js"));
	
	
	const Depack = (str)=>{
		return JSON.parse(Buffer.from(str, "base64").toString());
	};
	
	const Setup = async()=>{
		const { Module, Project, Environment } = Depack(("" + process.env.Opts));
		
		const project = new extendedProject({
			...MJSON,
			Path: ATA.Path.join(ATA.CWD, "./"),
			Environment,
		});
		
		project.Mod.Add(Module.Name, {
			Path: MJSON.Build.Mod[Module.Name],
			Name: "",
		});
		
		const job = project.Job.Add(Module.Name, {
			Name: Module.Name,
			Module,
			Project,
			Environment,
		});
		
		job.Send = function(){
			process.send.apply(process, [...arguments]);
		};
		
		await job.Execute();
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