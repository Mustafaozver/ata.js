module.exports=((ATA)=>{
	const wt = require("node:child_process");
	const Path = "./Core/";
	
	const ldr = Symbol();
	const isReady = Symbol();
	const precommand = Symbol();
	
	const Pack = (obj)=>{
		return Buffer.from(JSON.stringify({
			...obj
		})).toString("base64");
	};
	
	const Loader = (class_, config)=>{
		return()=>{
			const path = ATA.Path.join(ATA.MWD, "./App/Run.Thread.js");
			const cmd = [...class_[precommand], path];
			console.log(cmd, cmd[0], [...cmd.slice(1)]);
			const worker = wt.spawn(cmd[0], [...cmd.slice(1)], {
				stdio: ["pipe", "pipe", "pipe", "ipc"],
				shell: true,
				cwd: ATA.CWD,
				env: {
					...process.env,
					Opts: Pack({
						Module: {
							Name: config.Name,
							Type: class_.Type,
							
						},
						Project: {
							Name: config.Project.Name,
						},
						Environment: {
							...config.Environment,
						},
					}),
					
				},
			});
			
			class_[ldr] = worker;
			
			const addlistener = worker.addListener || worker.addEventListener || worker.on;
			
			worker.stdout.on("data", (message)=>{
				console.log("Core Data => ", message + "");
			});
			
			worker.stderr.on("data", (message)=>{
				//msg += "Error : " + message;
				console.log("Core Error => ", message + "");
			});
			
			worker.stdin.on("data", (message)=>{
				console.log("Core Error => ", message + "");
			});
			
			worker.addListener("disconnect", ()=>{
				//resolve(msg);
			});
			
			addlistener.apply(worker, ["message", async function(){
				console.log("Core message", [...arguments]);
				class_.OK([...arguments]);
				//class_.OnMessage.apply(worker,[...arguments]);
				//class_.HeartBeat();
			}]);
			
			addlistener.apply(worker, ["error", async function(){
				console.log("Core error", [...arguments]);
				class_.NO([...arguments]);
				//class_.OnError.apply(worker,[...arguments]);
				//class_.HeartBeat();
			}]);
			
			addlistener.apply(worker, ["exit", async function(){
				console.log("Core exit", [...arguments]);
				class_.NO([...arguments]);
				//class_.OnExit.apply(worker,[...arguments]);
				//class_.HeartBeat();
			}]);
			
			class_.Promise.then(()=>{
				class_[isReady] = true;
			}).catch(()=>{
				class_[isReady] = false;
			});
		};
	};
	
	return(class_, Adapter)=>{
		return class extends class_{
			static Path = Path;
			
			[ldr] = null;
			[isReady] = false;
			[precommand] = null;
			
			OnMessage = null;
			OnError = null;
			OnExit = null;
			
			constructor(config){
				super({
					Path,
					...config,
				});
				this.OnMessage = ()=>{};
				this.OnError = ()=>{};
				this.OnExit = ()=>{};
				this[precommand] = [...config.Commands];
				this[ldr] = Loader(this, config);
			};
			
			get Type(){
				return "Core";
			};
			
			get Path(){
				return ATA.Path.join(this.Directory, this.Name + ".js");
			};
			
			async Execute(){
				try{
					this[ldr]();
				}catch(e){
					Adapter.Report({
						Type: "Error",
						Message: "Module " + this.Type + " => " + this.Name + " [" + this.Path + "]",
						Root: e,
					});
					throw e;
				}
			};
			
			Send(){
				this[ldr].send.apply(this[ldr], [...arguments]);
			};
			
			HeartBeat(){
				
			};
			
			Check(){
				
			};
			
			Terminate(){
				
			};
		};
	};
})(ATA());