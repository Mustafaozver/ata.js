module.exports=((ATA)=>{
	const RL = ATA.Require("node:readline");
	const CP = ATA.Require("node:child_process");
	
	const no_regex = /^(((H|h)+(a)*(y)*(ı)*(r)*)|((N|n)+(o)*))$/i;
	const ye_regex = /^(((E|e)+(v)*(e)*(t)*)|((Y|y)+(e)*(s)*))$/i;
	
	const spinners_d8 = [
		"⠁", "⠉", "⠙", "⠹", "⢹", "⣹", "⣽",
		"⠂", "⠃", "⠋", "⠛", "⠻", "⢻", "⣻",
		"⠄", "⠆", "⠇", "⠏", "⠟", "⠿", "⢿",
		"⡀", "⡄", "⡆", "⡇", "⡏", "⡟", "⡿",
		"⢀", "⣀", "⣄", "⣆", "⣇", "⣏", "⣟",
		"⠠", "⢠", "⣠", "⣤", "⣦", "⣧", "⣯",
		"⠐", "⠰", "⢰", "⣰", "⣴", "⣶", "⣷",
		"⠈", "⠘", "⠸", "⢸", "⣸", "⣼", "⣾"
	];
	
	const progress_empty = " ";
	const progress_half = "░";
	const progress_full = "█";
	
	const mark_0 = "■";
	const mark_1 = "□";
	
	let rl = null;
	
	//
	
	const WAIT = async(t=1)=>{
		return await new Promise((resolve)=>{
			setTimeout(()=>{
				resolve(true);
			}, t);
		});
	};
	
	const ClearScreen = ()=>{
		process.stdout.write("\u001B[2J\u001B[0;0f");
	};
	
	const ClearLine = ()=>{
		const CSI = "\u001B[";
		process.stdout.write(CSI + "A" + CSI + "K");
		//process.stdout.write("\r\n");
	};
	
	const GetScreenSize = ()=>{
		return{
			w: process.stdout.columns,
			h: process.stdout.rows
		};
	};
	
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
	
	const Print = (msg)=>{
		ClearLine();
		process.stdout.write("\r" + msg + "\n\r\n\r");
	};
	
	
	
	const Progress = (()=>{
		const WIDTH = 25;
		const RATE = Symbol();
		const RID = Symbol();
		
		const Update = (ins)=>{
			const width = Math.floor(ins.Rate * WIDTH);
			const left_width = WIDTH - width;
			ClearLine();
			process.stdout.write("\r\n");
			process.stdout.write("[" + progress_full.repeat(width) + "" + progress_half.repeat(left_width) + "] " + ins.Message);
			
		};
		
		const Class = class{
			[RATE] = 0;
			[RID] = false;
			Message = "";
			constructor(){
				
			};
			
			Update(rate){
				this.Rate = rate;
				Update(this);
			};
			
			Start(){
				this[RID] = setInterval(()=>{
					this.Update(this.Rate);
				}, 100);
			};
			
			Stop(){
				this[RID] && clearInterval(this[RID]);
			};
			
			get Rate(){
				return this[RATE];
			};
			
			set Rate(rate){
				this[RATE] = Math.max(0, Math.min(1, rate - 0));
			};
		};
		
		return Class;
	})();
	
	const Spinner = (()=>{
		const RID = Symbol();
		
		const Start = (ins, spinners, interval=200, msg="")=>{
			const spinner_list = [...spinners];
			const length = spinner_list.length;
			let counter = 0;
			const Update = (n=0)=>{
				const index = n % length;
				const spinner = spinner_list[index];
				ClearLine();
				process.stdout.write("\r\n");
				process.stdout.write(spinner + " " + ins.Message);
				counter = index;
			};
			
			const time_interval = setInterval(()=>{
				Update(counter - - 1);
			}, interval);
			
			return time_interval;
		};
		
		const Class = class{
			[RID] = false;
			Message = "";
			constructor(){
				
			};
			
			Start(){
				this[RID] = Start(this, spinners_d8, 100);
			};
			
			Stop(){
				this[RID] && clearInterval(this[RID]);
			};
		};
		
		ATA.Setups.push(()=>{
			return;
			console.log("Spinner Setup");
			
			const exp = new Class();
			exp.Start();
			setTimeout(()=>{
				exp.Message = "naber laa";
			}, 10000);
		});
		
		return Class;
	})();
	
	
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
		Print,
		ClearScreen,
		ClearLine,
		GetScreenSize,
		Spinner,
		Progress,
	};
})(ATA());