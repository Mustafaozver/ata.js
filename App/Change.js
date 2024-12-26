#!/usr/bin/env node

((ATA)=>{
	const RL = ATA.Require("node:readline");
	const CP = ATA.Require("node:child_process");
	const CWD = ATA.CWD;
	const MWD = ATA.MWD;
	
	const no_regex = /^(((H|h)+(a)*(y)*(ı)*(r)*)|((N|n)+(o)*))$/i;
	const ye_regex = /^(((E|e)+(v)*(e)*(t)*)|((Y|y)+(e)*(s)*))$/i;
	
	let rl = null;
	
	process["__MODE"] = "CHANGE";
	
	const atajs_package = ATA.Require("./package.json");
	
	const Main = ATA.Require("./Core/Main.js");
	
	
})(require("../Core/Ata.js")());