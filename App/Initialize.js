#!/usr/bin/env node

((ATA)=>{
	const RL = ATA.Require("node:readline");
	const CP = ATA.Require("node:child_process");
	const CWD = ATA.CWD;
	const MWD = ATA.MWD;
	
	const no_regex = /^(((H|h)+(a)*(y)*(ı)*(r)*)|((N|n)+(o)*))$/i;
	const ye_regex = /^(((E|e)+(v)*(e)*(t)*)|((Y|y)+(e)*(s)*))$/i;
	
	let rl = null;
	
	process["__MODE"] = "INITIALIZE";
	
	const atajs_package = ATA.Require(ATA.Path.join(ATA.MWD, "./package.json"));
	
	const { extendedProject } = ATA.Require("./Core/Main.js");
	
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
	
	const ApplyTemplate = async(name, project_path, package, me, def=false)=>{
		
		const APPLY = ()=>{
			const template = ATA.Require(ATA.Path.join(MWD, "./Library/Build/", name + ".js"));
			console.log("Applying Base: " + name + "\n");
			return template(project_path, package, me);
		};
		
		if(def)return await APPLY();
		
		console.log("Apply Base: " + name);
		console.log("Do you want to apply this template? (Yes/No) ");
		while(true){
			const ans = def || await GetEntry("No");
			if(ye_regex.test(ans)){
				return await APPLY();
			} else if(no_regex.test(ans)){
				console.log("Template skipped: " + name + "\n");
				return;
			}
		}
	};
	
	const Setup_Main = (project_path, package, me)=>{
		const temp_main = ATA.Path.join(MWD, "./Templates/MAIN");
		
		const folder_names = Object.keys(ANA.System.Class).map((key)=>{
			me.Build[key] = {};
			
			const path = ATA.Path.join(project_path, ANA.System.Class[key].Path);
			
			ATA.FS.mkdirSync(path, {
				recursive: true
			});
			
			return path;
		});
		
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
			break;
		}
	};
	
	const Setup = async()=>{
		console.log("Project Name : ");
		const projectName = await GetEntry("atajs-example-project");
		
		const project_path = ATA.Path.join(CWD, projectName);
		
		/*
		ATA.FS.mkdirSync(project_path, {
			recursive: true
		});
		*/
		
		const package_path = ATA.Path.join(project_path, "./package.json");
		const me_path = ATA.Path.join(project_path, "./Config/M.json");
		const package = {};
		const me = {};
		
		console.log("Project Version : ");
		const projectVersion = await Promise.all([
			parseInt(await GetEntry("1")),
			parseInt(await GetEntry("0")),
			parseInt(await GetEntry("1")),
			parseInt(await GetEntry("0")),
			parseInt(await GetEntry("0")),
			parseInt(await GetEntry("0")),
			await GetEntry("BETA"),
		]);
		
		console.log("Project Description : ");
		const projectDescription = await GetEntry("a program");
		
		const projectLicense  = "GPL-3.0-only";
		
		console.log("Project Author : ");
		const projectAuthor = await GetEntry("Anonymous");
		
		//
		
		package.name = projectName;
		package.version = projectVersion.slice(0, 3).join(".");
		package.description = projectDescription;
		
		package.keywords = [];
		package.main = "./App/MAIN.js";
		package.license = projectLicense;
		package.scripts = {
			"test": "npx ata.test",
			"start": "npx ata.run",
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
		
		me.Application = "MAIN.js";
		me.Name = projectName;
		me.Version = projectVersion;
		me.Description = projectDescription;
		me.Author = projectAuthor;
		me.License = projectLicense;
		me.Build = {};
		me.Type = "PLAIN";
		
		Setup_Main(project_path, package, me);
		
		await Setup_OS(project_path, package, me);
		
		await ApplyTemplate("PLAIN", project_path, package, me, true);
		await ApplyTemplate("COMPILE", project_path, package, me);
		await ApplyTemplate("ELECTRON", project_path, package, me);
		//await ApplyTemplate("REACT", project_path, package, me);
		//await ApplyTemplate("EXPRESS", project_path, package, me);
		//await ApplyTemplate("DBMS", project_path, package, me);
		//await ApplyTemplate("DBMS/POSTGRESQL", project_path, package, me);
		//await ApplyTemplate("DBMS/SQLITE", project_path, package, me);
		
		ATA.FS.writeFileSync(package_path, JSON_stringify(package), "UTF8");
		ATA.FS.writeFileSync(me_path, JSON_stringify(me), "UTF8");
		
		//await Run_Command("npm install", project_path);
		//await Run_Command("konsole", project_path);
		
		Exit();
	};
	
	
	ATA.Setups.push(()=>{
		ClearScreen();
		ATA.Require(ATA.Path.join(ATA.MWD, "./App/Greeting.js"));
		rl = RL.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		setTimeout(()=>{
			Setup();
		}, 10);
	});
	
})(require("../Core/Ata.js")());