module.exports=((ATA)=>{
	return async(project_path, package, me)=>{
		//me.Build.Mod.Compile = "";
		//me.Build.Mod.Install = "";
		me.Build.Mod.Run = "./Mod/Run.json";
		me.Build.Mod.Test = "./Mod/Test.json";
	};
})(ATA());