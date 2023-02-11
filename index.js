/****************************************************************************************************
*	
*	A JavaScript LifeCycle Library (And also a Manifest) : ATA.JS (V8.0.5 Beta)
*	https://github.com/mustafaozver/ata.js/
*	
*	--------------------------------------------- (C) ----------------------------------------------
*	
*	Author : Mustafa ÖZVER
*	<mustafa.ozver@hotmail.com>
*	
*	Distributed under the BSD license:
*	
*	Copyright 2022 (c) Mustafa ÖZVER <mustafa.ozver@hotmail.com>
*	
*	Redistribution and use in source and binary forms, with or without modification, are permitted
*	provided that the following conditions are met:
*            
*		* Redistributions of source code must retain the above copyright notice, this list of
*	conditions and the following disclaimer.
*	
*		* Redistributions in binary form must reproduce the above copyright notice, this list of
*	conditions and the following disclaimer in the documentation and/or other materials provided
*	with the distribution.
*	
*	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES,
*	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
*	A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE 	LIABLE FOR ANY
*	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
*	LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
*	BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
*	STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
*	THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
****************************************************************************************************/

var NAME = "";
var VERSION = "";
var DESCRIPTION = "";
var COPYRIGHT = "";
var LICENSE = "";

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
						for(var i=0;i<obj.length;i++) text.push(DecodeObject(obj[i]));
						return "[" + text.join(",") + "]";
						break;
					case "object": // Object
						var keys = Object.keys(obj);
						text = "";
						for (var i=0;i<keys.length;i++) {
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
		setTimeout(function(){
			func.apply(THAT,[...args]);
		},1);
	};
	const waitUntil = async function(if_, eval_,time_=25) {
		let promise = new Promise(function(resolve, reject) {
			var f_temp = function() {
				if (eval(if_)) {
					delete f_temp;
					resolve();
				} else {
					setTimeout(f_temp,time_);
				}
			};
			f_temp();
		}).then(function() {
			return eval(eval_);
		});
		promise = await promise;
		return promise;
	};
	const isTimeCycled = function(lasttime, period){
		const thisTime = (new Date()).getTime();
		const PivotTime = thisTime % period;
		const lastPivotTime = lasttime % period;
		return(PivotTime < lastPivotTime);
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
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).toUpperCase(),
		}
	});
	var ATA = new ATA();
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
					var text = "_";
					for(var i=0;i<len;i++)text += chars.charAt(Math.floor(chars.length*Math.random()));
					if(!this.varIDs[text]){
						this.varIDs[text] = true;
						return text;
					}
				}
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
		},LOGs___:{},
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
		Version		: "Beta 8.0.5.0-00",
		Description	: "",
		CopyRight	: "Copyright (C) 2022",
		isReady		: false,
		isDebug		: false,
		isMaster	: false,
	});
	ATA.__reqs = {};
	ATA.__load = {};
	ATA.Require = function(name){
		name = "node:" + name;
		try{
			if(this.__reqs[name])return this.__reqs[name];
			return(this.__reqs[name] = this.GLOBAL[name] = require(name));
		}catch(e){
			console.log("Module " + name + " is missing.", e);
		}
		//throw new Error("Uncompleted");
	};
	ATA.Load = function(name){
		name = ATA.Path.join(ATA.CWD, "" + name);
		try{
			if(this.__load[name])return this.__load[name];
			return(this.__load[name] = this.GLOBAL[name] = require(name));//eval("var x = " + ATA.FS.readFileSync(name, {encoding:"utf8", flag:"r"}) + ";x"));
			;
		}catch(e){
			console.log("File " + name + " is missing.", e);
		}
		//throw new Error("Uncompleted");
	};
	ATA.GLOBAL = GLOBAL;
	//GLOBAL.ATA = ATA;
	ATA.Settings.ID = "ATAV7_" + ATA.UUID.Generate();
	GLOBAL.NAME = ATA.Name;
	GLOBAL.VERSION = ATA.Version;
	GLOBAL.DESCRIPTION = ATA.Description;
	GLOBAL.COPYRIGHT = ATA.CopyRight;
	ATA.OnMessage = function(e){
		if(e.data.EVAL){
			var generatedRes;
			var err = false;
			try {
				var code = e.data.EVAL+"";
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
	process.on("unhandledRejection", function(err){
		console.log("Unhandled rejection:", err.toString());
		//process.exit();
	});
	process.on('uncaughtException', function (err) {
		console.log('Caught exception: ', err.toString(), err);
		//process.exit();
	});
	process.on("message", async(data)=>{
		ATA.OnMessage({data});
	});
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
			var thisTime = (new Date()).getTime();
			var PivotTime = thisTime % ATA.LoopTime;
			var lastPivotTime = ATA.LastActivite % ATA.LoopTime;
			if(PivotTime < lastPivotTime){
				ATA.CheckSystem();
			}
			ATA.LastActivite = thisTime;
			var title = ATA.Name + " V(" + ATA.Version + ") " + (new Date(thisTime)) + " " + FormatTime(thisTime - ATA.StartTime);
			ATA.__title = title;
			process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7));
		},200);
	},10);
	
	ATA.waitUntil = waitUntil;
	ATA.isTimeCycled = isTimeCycled;
	ATA.DoFinalize = DoFinalize;
	ATA.FormatTime = FormatTime;
	ATA.DecodeObject = DecodeObject;
	
	ATA.Path = ATA.Require("path");
	ATA.FS = ATA.Require("fs");
	ATA.CWD = process.cwd();
	
	GLOBAL["ATA"] = function(){
		return ATA;
	};
	module.exports = ()=>{
		return ATA;
	};
	ATA.Thread = require("./Thread.js");
	let folders = [ATA.CWD];
	const readFolder = (n=0)=>{
		if(!(n < folders.length))return;
		const path = folders[n];
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())folders.push(filepath);
			//else if()
			console.log(filepath);
		});
		readFolder(n+1);
	};
	readFolder(0);
	delete folders;
})((function(){return this})());
else throw new Error("ATA is already called.");
