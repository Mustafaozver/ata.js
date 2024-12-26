#!/usr/bin/env node

((ATA)=>{
	const CWD = ATA.CWD;
	const MWD = ATA.MWD;
	console.log(process.argv);
	ATA.Inject("./App/Main.JS", {
		ATA,
	}, [...process.argv.slice(2)]);
})(require("../index.js")());