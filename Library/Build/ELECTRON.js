module.exports=((ATA)=>{
	return async(project_path, package, me)=>{
		//console.log(" >> ELECTRON >>", project_path, package, me);
		package.dependencies["electron"] = "31.0.2";
		package.scripts["start"] = "npx ata.electron";
		me.Type = "ELECTRON";
		return;
	};
})(ATA());