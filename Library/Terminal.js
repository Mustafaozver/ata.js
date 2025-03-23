module.exports=((ATA)=>{
	const RL = ATA.Require("node:readline");
	const CP = ATA.Require("node:child_process");
	
	const no_regex = /^(((H|h)+(a)*(y)*(ı)*(r)*)|((N|n)+(o)*))$/i;
	const ye_regex = /^(((E|e)+(v)*(e)*(t)*)|((Y|y)+(e)*(s)*))$/i;
	
	let rl = null;
	
	//
	
	const WAIT = async(t=1)=>{
		return await new Promise((resolve)=>{
			setTimeout(()=>{
				resolve(true);
			}, t);
		});
	};
	
	//
	
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
	
	//
	
	const CPRun = (cmd, args=[], opts={})=>{
		let worker = null;
		let msg = "";
		
		const promise = new Promise((resolve, reject)=>{
			const Start = ()=>{
				worker = CP.spawn(cmd + "", [...args], {
					//stdio: "inherit",
					shell: true,
					cwd: ATA.CWD,
					//detached: true,
					...(opts),
				});
				worker.addListener("exit", ()=>{
					resolve(msg.trim());
				});
				worker.addListener("error", (e)=>{
					reject([e, msg.trim()]);
				});
				worker.addListener("close", ()=>{
					resolve(msg.trim());
				});
				worker.stdout.on("data", (message)=>{
					msg += message;
					//console.log("" + message);
				});
				worker.stderr.on("data", (message) => {
					msg += "Error : " + message;
					//console.error("" + message);
				});
				worker.stdin.on("data", (message) => {
					msg += message;
				});
				/*worker.addListener("disconnect", ()=>{
					resolve(msg);
				});*/
				//
			};
			Start();
		});
		promise.worker = worker;
		return promise;
	};
	
	
	
	
	
	
	
	ATA.Setups.push(()=>{
		ClearScreen();
		rl = RL.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
	});
	
	return{
		WAIT,
		CPRun,
		ClearScreen,
		ClearLine,
		GetScreenSize,
	};
})(ATA());