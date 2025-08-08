((ATA, process, window)=>{
	const Electron = ATA.Require("electron");
	process.env["METHOD"] = "ELECTRON";
	process["__MODE"] = "ELECTRON_2";
	ATA.Electron = Electron;
	ATA.Window = window;
	window.Electron = Electron;
	
	ATA.Send = (method, data)=>{
		Electron.ipcRenderer.send("msgfrompage", {
			method,
			data
		});
	};
	
	ATA.OnMessage = (data)=>{
		console.log("GELEN DATA => ", data);
	};
	
	Electron.ipcRenderer.on("msgfromstarter", (event, arg)=>{
		ATA.OnMessage(arg);
	});
	
	ATA.Setups.push(()=>{
		const run_path = ATA.Path.join(ATA.MWD, "./App/Run_.js");
		ATA.Require(run_path);
	});
})(require("ata.js")(), process, window);