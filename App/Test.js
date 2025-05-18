#!/usr/bin/env node

((ATA)=>{
	const RL = ATA.Require("node:readline");
	const CP = ATA.Require("node:child_process");
	const CWD = ATA.CWD;
	const MWD = ATA.MWD;
	
	const no_regex = /^(((H|h)+(a)*(y)*(ı)*(r)*)|((N|n)+(o)*))$/i;
	const ye_regex = /^(((E|e)+(v)*(e)*(t)*)|((Y|y)+(e)*(s)*))$/i;
	
	let rl = null;
	
	process["__MODE"] = "TEST";
	
	const packageJSON = ATA.Require(ATA.Path.join(ATA.CWD, "./package.json"));
	const MJSON = ATA.Require(ATA.Path.join(ATA.CWD, "./Config/M.json"));
	const packageJSON_ATA = ATA.Require(ATA.Path.join(ATA.MWD, "./package.json"));
	
	
	const {
		extendedProject,
	} = ATA.Require("./Core/Main.js");
	
	const { Version } = ATA.Require("./Library/Version.js");
	
	const project = new extendedProject({
		Name: MJSON.Name,
		Path: ATA.Path.join(ATA.CWD, "./"),
	});
	
	project.Version = new Version([Date.now(), ...MJSON.Version]);
	
	console.log({
		//packageJSON,
		//packageJSON_ATA,
		LL: MJSON,
		VV: project.Version.VersionF,
		project,
		//LO: project.Path,
		//LN: project.Name,
	});
	
})(require("../Core/Ata.js")());