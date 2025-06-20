#!/usr/bin/env node

((ATA)=>{
	const RL = ATA.Require("node:readline");
	const CP = ATA.Require("node:child_process");
	const CWD = ATA.CWD;
	const MWD = ATA.MWD;
	
	const no_regex = /^(((H|h)+(a)*(y)*(ı)*(r)*)|((N|n)+(o)*))$/i; // NO or HAYIR
	const ye_regex = /^(((E|e)+(v)*(e)*(t)*)|((Y|y)+(e)*(s)*))$/i; // YES or EVET
	
	let rl = null;
	
	process["__MODE"] = "RUN";
	
	const packageJSON = ATA.Require(ATA.Path.join(ATA.CWD, "./package.json"));
	const MJSON = ATA.Require(ATA.Path.join(ATA.CWD, "./Config/M.json"));
	const packageJSON_ATA = ATA.Require(ATA.Path.join(ATA.MWD, "./package.json"));
	
	const {
		extendedProject,
	} = ATA.Require(ATA.Path.join(ATA.MWD, "./Core/Main.js"));
	
	const Environment = {
		
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
	
	project.Execute("Run").then(()=>{
		
	});
	
})(require("../Core/Ata.js")());