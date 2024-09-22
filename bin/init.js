#!/usr/bin/env node

((ATA)=>{
	const RL = ATA.Require("node:readline");
	const CP = require("node:child_process");
	const CWD = ATA.CWD;
	const MWD = ATA.MWD;
	
	const atajs_package = ATA.Require(ATA.Path.join(MWD, "./package.json"));
	
	const no_regex = /^(((H|h)+(a)*(y)*(ı)*(r)*)|((N|n)+(o)*))$/i;
	const ye_regex = /^(((E|e)+(v)*(e)*(t)*)|((Y|y)+(e)*(s)*))$/i;
	
	let rl = null;
	
	const JSON_stringify = (object)=>{
		const replacer = (key, value)=>{
			return value;
		};
		return JSON.stringify(object, replacer, "\t");
	};
	
	const GetEntry = async(def="")=>{
		console.log(" Default: \"" + def + "\"");
		const answer = await new Promise((resolve, reject)=>{
			rl.question(" => ", (answer)=>{
				resolve(answer);
			});
		});
		console.log("");
		if(answer === "")return def;
		return answer;
	};
	
	const Run_Command = async(cmd, cwd=ATA.CWD, options={})=>{
		let worker = null;
		return await new Promise((resolve, reject)=>{
			worker = CP.spawn(cmd, [""], {
				stdio: "inherit",
				shell: true,
				cwd,
			});
			worker.addListener("exit", ()=>{
				resolve();
			});
			worker.addListener("message", (msg)=>{
				process.stdout.write(msg);
			});
			worker.addListener("error", (err)=>{
				console.log(err);
			});
		});
	};
	
	const Setup_Main = (project_path)=>{
		const folders = [
			"App", // başlatıcılar, modlar
			//"Base",
			"Config", // konfigürasyonlar
			"Constant", // Sabit değerler
			"Controller", // Controller
			"Core", // Çekirdek işlemler
			//"DB", // veri tabanı
			//"Debug", // hata ayıklama
			"Document", // dokümantasyon
			//"Extension", // eklentiler
			//"Interface", // harici arayüz
			"Job", // thread, ayrı iş parçacıkları
			//"Key", // lisanslar
			"Library", // kütüphaneler
			//"Locale", // yerelleştirme dosyaları
			//"Log", // log kayıtları
			//"Module", // modüller
			//"Report", // raporlar
			//"Resource",
			"Service", // servisler
			"Source", // kaynak dosyalar
			//"Temp", // geçici dosyalar
			//"Templates", // şablonlar
			"Test", // testler
			//"View", // grafiksel arayüz
		];
		folders.map((name)=>{
			ATA.FS.mkdirSync(ATA.Path.join(project_path, name), {
				recursive: true
			});
		});
		const temp_main = ATA.Path.join(MWD, "./Templates/main");
		ATA.FS.cpSync(temp_main, project_path, {
			recursive: true
		});
	};
	
	const Setup_OS = async(project_path, package, me)=>{
		console.log("Target OS : ");
		console.log("L : Linux");
		console.log("W : Windows");
		console.log("O : Other");
		const os = await GetEntry("L");
		switch(os){
			case"L":
			case"l":
				me.OS = "LINUX";
				package.os = ["linux"];
				const temp_linux = ATA.Path.join(MWD, "./Templates/linux");
				ATA.FS.cpSync(temp_linux, project_path, {
					recursive: true
				});
			break;
			case"W":
			case"w":
				me.OS = "WIN";
				package.os = ["win32"];
				const temp_windows = ATA.Path.join(MWD, "./Templates/windows");
				ATA.FS.cpSync(temp_windows, project_path, {
					recursive: true
				});
			break;
			case"O":
			case"o":
			default:
				me.OS = "OTHER";
				//package.os = ["win32"];
			break;
		}
	};
	
	const ClearScreen = ()=>{
		process.stdout.write('\u001B[2J\u001B[0;0f');
	};
	
	const ClearLine = ()=>{
		const CSI = '\u001B[';
		process.stdout.write(CSI + 'A' + CSI + 'K');
	};
	
	const GetScreenSize = ()=>{
		return{
			w: process.stdout.columns,
			h: process.stdout.rows
		};
	};
	
	const SetCursorPosition = async(x, y)=>{
		return await new Promise((resolve, reject)=>{
			process.stdout.cursorTo(x, y, resolve);
		});
	};
	
	const SetProgressBar = (x=0, msg="")=>{
		ClearLine();
		let em = "░";
		let fu = "█"
		let text = "";
		const limit = 40;
		for(let i=0;i<limit;i++){
			if((i/limit) > x) text += em;
			else text += fu;
		}
		text += " " + (100*x).toFixed(2) + "% " + msg;
		process.stdout.write(text + "\n");
	};
	
	const DownLoadFile = async(url)=>{
		const data = await new Promise((resolve, reject)=>{
			const fileData = Path.parse(url);
			const fileName = fileData.name + fileData.ext;
			const outStream = FS.createWriteStream(fileName);
			let received_bytes = 0;
			let total_bytes;
			Request.get(url)
			.on("error", ()=>{
				reject();
			})
			.on("response", (data)=>{
				total_bytes = parseInt(data.headers["content-length"]);
				SetProgressBar(0, "starting...");
			})
			.on("data", (data)=>{
				received_bytes += data.length;
				SetProgressBar(received_bytes/total_bytes, fileName + " downloading...");
				//if(received_bytes == total_bytes)resolve(true);
			})
			.on("end", ()=>{
				ClearLine();
				process.stdout.write("> " + fileName + " downloaded.\n\n");
				resolve(true);
			})
			.pipe(outStream);
		});
		return data;
	};
	
	const ApplyTemplate = async(name, project_path, package, me)=>{
		const template = ATA.Require(ATA.Path.join(MWD, "./Collection/", name + ".js"));
		return await template(project_path, package, me);
	};
	
	const Question = async(msg="")=>{
		while(true){
			console.log(msg + " [Y/N] ? ");
			const answer = await GetEntry();
			if(ye_regex.test(answer))return true;
			else if(no_regex.test(answer))return false;
			//return 2;
			console.log("");
		}
	};
	
	const Setup = async()=>{
		console.log("Project Name : ");
		const projectName = await GetEntry("atajs-example-project");
		
		const project_path = ATA.Path.join(CWD, projectName);
		
		ATA.FS.mkdirSync(project_path, {
			recursive: true
		});
		
		const package_path = ATA.Path.join(project_path, "./package.json");
		const me_path = ATA.Path.join(project_path, "./me.json");
		const package = {};
		const me = {};
		
		console.log("Project Version : ");
		const projectVersion = await GetEntry("1.0.0");
		
		console.log("Project Description : ");
		const projectDescription = await GetEntry("a program");
		
		const projectLicense  = "GPL-3.0-only";
		
		console.log("Project Author : ");
		const projectAuthor = await GetEntry("Anonymous");
		
		
		package.name = projectName;
		package.version = projectVersion;
		package.description = projectDescription;
		
		package.keywords = [];
		package.main = "./App/Main.js";
		package.license = projectLicense;
		package.scripts = {
			//"start": "npx electron ./App/Electron.js",
			//"serve": "node ./App/Main.JS serve",
			"test": "nodemon ./App/Test.JS"
		};
		package.dependencies = {
			"ata.js": atajs_package.version,
			//"dotenv": "^16.4.5",
			//"i18n": "^0.15.1",
			//"ejs": "^3.1.10",
			//"typescript": "^5.4.5",
			//"sass": "^1.77.4",
			//"terser": "^5.31.0",
			//"sqlite3": "^5.1.7",
			//"winston": "^3.13.0",
		};
		package.devDependencies = {
			"mocha": "^10.2.0",
			"nodemon": "^2.0.21",
			"electron": "^31.0.2",
		};
		package.engines = {
			"node": ">=18.0.0",
			"npm": ">=8.0.0",
		};
		/*package.repository = {
			type: "git",
			url: "git+https://github.com/npm/cli.git"
		};*/
		
		/*package.funding ={
			type: "individual",
			url: "http://example.com/donate"
		};*/
		
		//package.cpu = ["x64"];
		
		//package.private = true;
		
		me.Name = projectName;
		me.Version = projectVersion;
		me.Description = projectDescription;
		me.Author = projectAuthor;
		me.License = projectLicense;
		me.Library = {};
		me.Type = "PLAIN";
		
		Setup_Main(project_path);
		
		
		
		
		
		await Setup_OS(project_path, package, me);
		
		await ApplyTemplate("ELECTRON", project_path, package, me);
		//await ApplyTemplate("REACT", project_path, package, me);
		//await ApplyTemplate("EXPRESS", project_path, package, me);
		//await ApplyTemplate("DBMS", project_path, package, me);
		//await ApplyTemplate("DBMS/POSTGRESQL", project_path, package, me);
		//await ApplyTemplate("DBMS/SQLITE", project_path, package, me);
		
		ATA.FS.writeFileSync(package_path, JSON_stringify(package), "UTF8");
		ATA.FS.writeFileSync(me_path, JSON_stringify(me), "UTF8");
		
		await Run_Command("npm install", project_path);
		//await Run_Command("konsole", project_path);
		
		
		Exit();
	};
	
	ATA.Setups.push(()=>{
		ClearScreen();
		rl = RL.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		setTimeout(()=>{
			Setup();
		}, 10);
	});
	
})(require("../index.js")());