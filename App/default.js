#!/usr/bin/env node

((ATA)=>{
	const RL = ATA.Require("node:readline");
	const CP = ATA.Require("node:child_process");
	const Commander = ATA.Require("commander");
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
	
	const ClearScreen = ()=>{
		process.stdout.write("\u001B[2J\u001B[0;0f");
	};
	
	const ClearLine = ()=>{
		const CSI = "\u001B[";
		process.stdout.write(CSI + "A" + CSI + "K");
	};
	
	const GetScreenSize = ()=>{
		return{
			w: process.stdout.columns,
			h: process.stdout.rows
		};
	};
	
	
	
	
	
	
	
	
	
	
	
	
	const ChangeProject = (options)=>{};
	const CreateProject = (options)=>{
		ATA.Require("./Core/Create.js")(options);
	};
	
	const RunProject = (options, mode)=>{
		ATA.Require("./Core/Run.JS")(options, mode);
	};
	
	const Setup = ()=>{
		const program = new Commander.Command();
		program.version("9.0.5");
		//program.option("-v, --version", "output the version number");
		program.option("-i, --init", "initialize a new project");
		program.option("-t, --test", "run test cases");
		program.option("-r, --run", "run the project");
		program.option("-c, --change", "change the project");
		program.parse(process.argv);
		const options = program.opts();
		if(options.version){
			console.log("ATA.JS v 9.0.5");
			return Exit();
		}else if(options.change){
			ClearScreen();
			ChangeProject(options);
		}else if(options.init){
			ClearScreen();
			CreateProject(options);
		}else if(options.run){
			RunProject(options, "normal");
		}else if(options.test){
			RunProject(options, "test");
		}else{
			console.log("NO COMMAND");
		}
	};
	
	ATA.Setups.push(()=>{
		rl = RL.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		setTimeout(()=>{o
			Setup();
		}, 10);
	});
	
})(require("../index.js")());