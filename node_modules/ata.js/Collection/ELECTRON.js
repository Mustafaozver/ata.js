module.exports=((ATA)=>{
	return async(project_path, package, me)=>{
		console.log(" >> ELECTRON >>", project_path, package, me);
		me.Type = "ELECTRON";
		await new Promise((resolve)=>{
			setTimeout(resolve, 3000);
		});
	};
})(ATA());