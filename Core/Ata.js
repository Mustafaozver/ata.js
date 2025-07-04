/****************************************************************************************************
*	
*	A JavaScript LifeCycle Library (And also a Manifest) : ATA.JS (V10.0.3 Beta)
*	https://github.com/mustafaozver/ata.js/
*
*	Author : Mustafa ÖZVER
*	<mustafa.ozver@hotmail.com>
*
****************************************************************************************************/

const NAME = "";
const VERSION = "";
const DESCRIPTION = "";
const COPYRIGHT = "";
const LICENSE = "";

if(typeof ATA === "undefined")(function(GLOBAL){ // singleton class
	if(!GLOBAL["Infinity"])GLOBAL["Infinity"] = 99999999999999999;
	const PInfinity = 0.0000000000000001;
	const PrivateKey = function(name){return Symbol(name)};
	const _ = PrivateKey("ATA");
	const loc = ""; // __dirname
	const mCode = "" + arguments.callee;
	const _f = function(){/*
		
	*/};
	switch((function(){
		return 0;
		const hextable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
		let lic = arguments[0] + "";
		lic = lic.toUpperCase();
		lic.split("-").map(function(item,index){
			const l0 = hextable[hextable.length - (index % hextable.length)];
			const ls = item.split("").map(function(item2, index2){
				return hextable.indexOf(item2);
			});
			console.log(ls);
		});
	})(LICENSE)){
		default:
		case 1:
			throw new Error("Your license for ATA.js library is expired.");
		case 2:
			return;
		case 0:
		break;
	}
	const DecodeObject = function(obj){
		if(obj)switch((typeof obj).toLowerCase()){
			default:
			case "string": // String
				return JSON.stringify(obj);
			break;
			case "object": // Object or Array or else
				const objType = obj.constructor.name;
				let text;
				switch(objType.toLowerCase()){
					default:break;
					case "array": // Array
						text = [];
						for(let i=0;i<obj.length;i++) text.push(DecodeObject(obj[i]));
						return "[" + text.join(",") + "]";
						break;
					case "object": // Object
						let keys = Object.keys(obj);
						text = "";
						for (let i=0;i<keys.length;i++) {
							try{
								if(!obj[keys[i]])continue; // Unreadable values
								//if(keys[i] == "")continue;
								text += (keys[i]) + ":" + DecodeObject(obj[keys[i]]) + "";
								if (i < keys.length - 1) text += ",";
							}catch(e){
								return "{}";
							}
						}
						return "{" + text + "}";
					break;
				}
				if (objType == "RegExp"){
					return (obj)+""; // "new RegExp()";
				}
				if (objType == "Error"){
					return "new Error(\"\")";
				}
				//return "Object.assign(new " + objType + "(),{" + text + "})";
				return"{}";
			break;
			case "number": // Number
				return obj;
			break;
			case "function": // Function
				return obj+"";
			break;
			case "boolean": // Boolean
				return obj+"";
			break;
		}
	};
	const FormatTime = function(oMsec) {
		let ftext = "[Y-M-D] [H:m:S]";
		const micSec = oMsec % 1000;
		let totalcount = Math.floor(oMsec/1000);
		const sec = totalcount%60;
		totalcount = Math.floor(totalcount/60);
		const min = totalcount%60;
		totalcount = Math.floor(totalcount/60);
		const hour = totalcount%24;
		totalcount = Math.floor(totalcount/24);
		const day = totalcount%30;
		totalcount = Math.floor(totalcount/30);
		const month = totalcount%12;
		const year = Math.floor(totalcount/12);
		if(year == 0){
			ftext = ftext.replace("Y-","");
			if(month == 0){
				ftext = ftext.replace("M-","");
				if(day == 0){
					ftext = ftext.replace("[D] ","");
					if(hour == 0){
						ftext = ftext.replace("H:","");
					}
				}
			}
		}
		ftext = ftext.replace("Y",year);
		ftext = ftext.replace("M",(month/100).toFixed(2).substr(2));
		ftext = ftext.replace("D",(day/100).toFixed(2).substr(2));
		ftext = ftext.replace("H",(hour/100).toFixed(2).substr(2));
		ftext = ftext.replace("m",(min/100).toFixed(2).substr(2));
		ftext = ftext.replace("S",(sec/100).toFixed(2).substr(2)+(micSec/1000).toFixed(3).substr(1));
		return ftext;
	};
	const DoFinalize = function(func, args){
		const THAT = this;
		setTimeout(()=>{
			func.apply(THAT,[...args]);
		},1);
	};
	const waitUntil = async function(if_, eval_,time_=25) {
		return await new Promise((resolve, reject)=>{
			const f_temp = ()=>{
				if(eval(if_))resolve(eval(eval_));
				else setTimeout(f_temp,time_);
			};
			f_temp();
		});
	};
	const isTimeCycled = function(lasttime, period){
		const thisTime = (new Date()).getTime();
		const PivotTime = thisTime % period;
		const lastPivotTime = lasttime % period;
		return(PivotTime < lastPivotTime);
	};
	const MakeASync = async(func, args=[])=>{
		return await func(...args);
	};
	const RunInTime = async(func, timeout=10000)=>{
		return await new Promise((resolve, reject) => {
			MakeASync(func).then(resolve).catch(reject);
			setTimeout(reject, timeout);
		});
	};
	const TryerASync = async(arr=[], timeout=10000)=>{
		return await new Promise(async(resolve, reject)=>{
			const resp = [];
			let index = 0;
			while(index < arr.length){
				try{
					const result = await RunInTime(arr[index]);
					resp.unshift(result);
					return resolve(resp);
				}catch(e){
					resp.unshift(e);
					index++;
				}
			}
			return reject(resp);
		});
	};
	
	var ATA = function(){};
	Object.assign(ATA.prototype,{
		LoopTime:1000,
		StartTime:(new Date()).getTime(),
		valueOf:function(){
			return GLOBAL;
		},
		toString:function(){
			return ATA.Name + " V(" + ATA.Version + ")";
		},
		ID:{
			UUID:("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g,function(c){
				const r = Math.random() * 16 | 0;
				const v = c == "x" ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).toUpperCase(),
		}
	});
	/*Object.defineProperty(ATA.prototype, "process", {
		get: function(){
			return process;
		},
		set: function(value){
			
		}
	});*/
	var ANA = ATA;
	var ATA = new ATA();
	
	require("./Adapter.js")(ATA, ANA, GLOBAL);
	
	Object.assign(ATA,{
		LastActivite:0,
		Settings:{
			//ID:"",
			//ROOT:loc + "\\NODE_TRADER\\"
		},
		
		Loops:[],
		
		Setups:[],
		
		UUID:{
			varIDs:{},
			Generate:function(){
				const len = 16;
				const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
				while(true){
					let text = "_";
					for(let i=0;i<len;i++)text += chars.charAt(Math.floor(chars.length*Math.random()));
					if(!this.varIDs[text]){
						this.varIDs[text] = true;
						return text;
					}
				}
			},
		},
		
		ULID:{
			Generate:function(){
				let now = Date.now();
				const alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
				const generateRandomChar = () => alphabet[Math.floor(Math.random() * alphabet.length)];
				
				const timePart = now.toString(36).toUpperCase();
				const randomPart = Array.from({
					length: 16
				}, generateRandomChar).join("");
				
				return timePart.padStart(10, "0") + randomPart;
			},
		},
		
		MID:{
			Generate:function(subH=0, subL=0){
				const GenerateRandom = (b=36)=>{
					return Math.floor(Math.random() * b).toString(b);
				};
				
				const nHChar = 3;
				const nLChar = 7;
				
				const subHMax = 36 ** nHChar - 1;
				const subLMax = 36 ** nLChar - 1;
				
				const subHMin = 36** (nHChar - 1);
				const subLMin = 36** (nLChar - 1);
				
				const subTime = Date.now();
				
				const timePart = subTime.toString(36);
				const randPart = Array(15 - timePart.length).fill(36).map(GenerateRandom).join("");
				
				const subHPart = Math.min(Math.max(subH, subHMin), subHMax).toString(36);
				const subLPart = Math.min(Math.max(subL, subLMin), subLMax).toString(36);
				
				return ("MIDSH" + subHPart + "SL" + subLPart + "TS" + timePart + "RN" + randPart + "FO").toUpperCase();
			},
		},
		
		Log:function(message){
			if(!this.isDebug)return;
			const thisDate = new Date();
			let text = "";
			text += "|\t[" + thisDate.getTime() + "]" + thisDate,"\t" + FormatTime(thisDate.getTime() - this.StartTime) + "\n\r";
			text += "|\tSystem : " + message + "\n\r";
			console.log(text);
			this.LOGs___[(new Date()).getTime()] = message;
		},
		
		LOGs___:{},
		
		CheckSystem:async function(){ // Check system
			if(this.Setups.length > 0){
				this.Log("ATA is starting...");
				await this.Setup();
				this.Log("ATA is started.");
				return;
			}
			this.Loop();
			this.Log("ATA is alive.");
		},
		
		Setup:async function(){ // Setup function
			while(this.Setups.length > 0){
				let tempf = this.Setups.shift();
				try{
					await tempf.apply(this,[this.LastActivite]);
				}catch(e){
					console.warn(e,tempf);
					this.Setups.push(tempf);
					return;
				}
			}
		},
		
		Loop:async function(){
			const newdate = new Date();
			for(let i=0;i<this.Loops.length;i++){
				try{
					this.Loops[i].apply(this,[newdate]);
					this.Log("ATA cycled " + this.Loops.length + " function(s) successfuly.");
				}catch(e){
					this.Log(e);
				}
			}
			this.Log("ATA forced %" + ((newdate.getTime()%ATA.LoopTime)*100/ATA.LoopTime).toFixed(2));
		},
	});
	
	Object.assign(ATA, {
		Name		: "ATA.JS for Node.JS",
		Version		: "Beta 10.0.3.0-00",
		Description	: "",
		CopyRight	: "Copyright (C) 2025",
		isReady		: false,
		isDebug		: false,
		isMaster	: false,
	});
	
	ATA.GLOBAL = GLOBAL;
	//GLOBAL.ATA = ATA;
	ATA.Settings.ID = "ATAVX_" + ATA.UUID.Generate();
	GLOBAL.NAME = ATA.Name;
	GLOBAL.VERSION = ATA.Version;
	GLOBAL.DESCRIPTION = ATA.Description;
	GLOBAL.COPYRIGHT = ATA.CopyRight;
	
	ATA.OnMessage = function(e){
		if(e.data.EVAL){
			var generatedRes;
			let err = false;
			try {
				const code = e.data.EVAL+"";
				generatedRes = eval.apply(ATA.GLOBAL,["try{var generatedRes=("+code+");}catch(e){generatedRes=e};generatedRes"]);
			} catch (e) {
				generatedRes = e.message;
				err = true;
			}
			try{
				ATA.SendMessage({
					ID		: e.data.ID,
					Answer	: generatedRes,
					Error	: err,
				});
			}catch(err){
				ATA.SendMessage({
					ID		: e.data.ID,
					Answer	: err.message,
					Error	: true,
				});
			}
		}
	};
	
	ATA.SendMessage = (msg)=>{
		process.send(msg);
	};
	
	const Exit = (code=0)=>{
		process.reallyExit(code);
	};
	
	GLOBAL.Exit = ()=>{
		Exit();
	};
	
	setTimeout(async function(){ // Start trigger
		setInterval(function(){ // Time => /|. Clock
			const thisTime = (new Date()).getTime();
			const PivotTime = thisTime % ATA.LoopTime;
			const lastPivotTime = ATA.LastActivite % ATA.LoopTime;
			if(PivotTime < lastPivotTime){
				ATA.CheckSystem();
			}
			ATA.LastActivite = thisTime;
			//var title = ATA.Name + " V(" + ATA.Version + ") " + (new Date(thisTime)) + " " + FormatTime(thisTime - ATA.StartTime);
			//ATA.__title = title;
			//process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7));
		},200);
	},10);
	
	ATA.waitUntil = waitUntil;
	ATA.isTimeCycled = isTimeCycled;
	ATA.MakeASync = MakeASync;
	ATA.RunInTime = RunInTime;
	ATA.TryerASync = TryerASync;
	ATA.DoFinalize = DoFinalize;
	ATA.FormatTime = FormatTime;
	ATA.DecodeObject = DecodeObject;
	
	module.exports = ()=>{
		return ATA;
	};
	
	ATA.Thread = require("./Thread.js");
	ATA.SandBox = require("./SandBox.js");
	
})((function(){return this})());
else throw new Error("ATA is already called.");
