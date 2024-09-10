#!/usr/bin/env node

// CLI logic burada yer alacak

((ATA)=>{
	const path = ATA.CWD;
	const folders = [
		"App",
		"Base",
	];
	
	folders.map((name)=>{
		ATA.FS.mkdir(ATA.Path.join(path, "./" + name));
	});
	
})(require("../index.js")());