#!/usr/bin/env node

((ATA)=>{
	const Electron = ATA.Require("electron");
	ATA.Electron = Electron;
	
	process["__MODE"] = "ELECTRON_1";
	process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
	
	const Setup = async()=>{
		
		const html_path = ATA.Path.join(ATA.MWD, "./InterFace/Electron/Index.html");
		const preload = ATA.Path.join(ATA.MWD, "./InterFace/Electron/PreLoad.js");
		
		Electron.app.whenReady().then(()=>{
			const Top = new Electron.BrowserWindow();
			const Win = new Electron.BrowserWindow({
				parent: Top,
				width: 600,
				height: 400,
				webPreferences: {
					nodeIntegration: true,
					nodeIntegrationInWorker: true,
					nodeIntegrationInSubFrames: true,
					preload,
					contextIsolation: false,
					enableRemoteModule: true,
				},
			});
			
			Top.hide();
			//Win.hide();
			Win.show();
			
			Win.loadFile(html_path);
			Win.webContents.openDevTools(true);
			Win.maximize();
		});
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
})(require("../Core/Ata.js")());