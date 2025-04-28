#!/usr/bin/env node

((ATA)=>{
	const CP = ATA.Require("node:child_process");
	
	process["__MODE"] = "ELECTRON_0";
	
	const Pack = (obj)=>{
		return Buffer.from(JSON.stringify({
			...obj
		})).toString("base64");
	};
	
	const Setup = async()=>{
		let worker = null;
		
		const path = ATA.Path.join(ATA.MWD, "./App/Run.js");
		
		const Start = ()=>{
			worker = CP.spawn("npx electron", [path], {
				//stdio: ["pipe", "pipe", "pipe", "ipc"],
				stdio: "inherit",
				shell: true,
				cwd: ATA.CWD,
				env: {
					...process.env,
					/*Opts: Pack({
						Module: {
							Name: config.Name,
							Type: "Job",
							
						},
						Project: {
							Name: config.Project.Name,
						},
						Environment: {
							...config.Environment,
						},
					}),*/
				}
			});
			
			const addlistener = worker.addListener || worker.addEventListener || worker.on;
			
			addlistener.apply(worker, ["message", async function(){
				OnData(arguments[0]);
			}]);
			
			addlistener.apply(worker, ["error", async function(){
				OnError(arguments[0]);
			}]);
			
			addlistener.apply(worker, ["exit", async function(){
				OnExit();
			}]);
			
			addlistener.apply(worker, ["close", async function(){
				OnClose();
			}]);
		};
		
		const OnExit = ()=>{
			process.exit();
			//return;
			//setTimeout(ReStart, 1);
		};
		
		const OnError = (e)=>{
			console.log(e);
		};
		
		const OnClose = ()=>{
			
		};
		
		const OnData = (data)=>{
			
			
		};
		
		/*
		const ReStart = ()=>{
			try {
				worker.terminate();
			} catch (e) { }
			try {
				Start();
			} catch (e) { }
		};
		*/
		
		Start();
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
})(require("../Core/Ata.js")());