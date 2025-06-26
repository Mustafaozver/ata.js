module.exports = ((ATA)=>{
	const SHARE = {};
	
	const PrivateKey = Symbol();
	
	const _GetParam = (key="")=>{
		return SHARE[key + ""];
	};
	const _SetParam = (key="", value=false)=>{
		SHARE[key + ""] = value;
	};
	
	const ScopeController = (()=>{
		const Class = class{
			
		};
		
		return Class;
	})();
	
	const ScopeRegister = (scope)=>{
		const scopec = new ScopeController({
			scope,
		});
		
		scope[PrivateKey] = scopec;
		
		return scopec;
	};
	
	const ScopeCheck = (scope)=>{
		if(scope[PrivateKey])return true;
		else return false;
	};
	
	const globalFix = (()=>{
		const fix = {};
		
		fix.setTimeout = (func=()=>{}, time=1)=>{
			return setTimeout(()=>{
				func();
			}, time);
		};
		
		fix.OnError = (err)=>{
			console.warn(err);
			throw err;
		};
		
		return fix;
	})();
	
	const GenerateDefault = (obj, log=()=>{})=>{
		const globals = {
			_:true,
			// İşletim Sistemi ve Çevresel Değişkenlere Erişim
			"process": undefined,
			"os": undefined,
			"path": undefined,
			"child_process": undefined,
			"fs": undefined,
			
			// Dinamik Kod Çalıştırma ve Zamanlayıcı Fonksiyonlar
			"eval": undefined,
			"Function": undefined,
			"setTimeout": undefined,
			"setInterval": undefined,
			"setImmediate": undefined,
			"clearTimeout": undefined,
			"clearInterval": undefined,
			"clearImmediate": undefined,
			
			// Global ve Belge Nesnesine Erişim
			"global": undefined,
			"globalThis": undefined,
			"parent": undefined,
			"window": undefined,
			"document": undefined,
			"self": undefined,
			"top": undefined,
			"frames": undefined,
			"frameElement": undefined,
			
			// Ağ İletişimi ve Veri Depolama
			"navigator": undefined,
			"location": undefined,
			"origin": undefined,
			"external": undefined,
			"fetch": undefined,
			"XMLHttpRequest": undefined,
			"WebSocket": undefined,
			"localStorage": undefined,
			"sessionStorage": undefined,
			"indexedDB": undefined,
			"cookieStore": undefined,
			
			// Kriptografik İşlemler ve Güvenlik
			"crypto": undefined,
			
			// Kullanıcı Etkileşimleri
			"alert": undefined,
			"prompt": undefined,
			"confirm": undefined,
			"console": undefined,
			
			// Modül Sistemi ve Dosya Yol Bilgileri
			"require": undefined,
			"module": undefined,
			"exports": undefined,
			"__dirname": undefined,
			"__filename": undefined,
			
			// Tarayıcı ve Node.js Özel Nesneleri
			"Buffer": undefined,
			
			// Tarayıcı Fonksiyonları ve Nesneleri
			"onerror": undefined,
			"atob": undefined,
			"blur": undefined,
			"btoa": undefined,
			"cancelAnimationFrame": undefined,
			"cancelIdleCallback": undefined,
			"captureEvents": undefined,
			"close": undefined,
			"createImageBitmap": undefined,
			"find": undefined,
			"focus": undefined,
			"getComputedStyle": undefined,
			"getSelection": undefined,
			"matchMedia": undefined,
			"moveBy": undefined,
			"moveTo": undefined,
			"open": undefined,
			"postMessage": undefined,
			"print": undefined,
			"queueMicrotask": undefined,
			"releaseEvents": undefined,
			"reportError": undefined,
			"requestAnimationFrame": undefined,
			"requestIdleCallback": undefined,
			"resizeBy": undefined,
			"resizeTo": undefined,
			"scroll": undefined,
			"scrollBy": undefined,
			"scrollTo": undefined,
			"stop": undefined,
			"structuredClone": undefined,
			"webkitCancelAnimationFrame": undefined,
			"webkitRequestAnimationFrame": undefined,
			"getScreenDetails": undefined,
			"openDatabase": undefined,
			"queryLocalFonts": undefined,
			"showDirectoryPicker": undefined,
			"showOpenFilePicker": undefined,
			"showSaveFilePicker": undefined,
			"webkitRequestFileSystem": undefined,
			"webkitResolveLocalFileSystemURL": undefined,
			
			// Fetch API ve İlgili Nesneler
			"fetch": undefined,
			"blinkfetch": undefined,
			"blinkResponse": undefined,
			"blinkFormData": undefined,
			"blinkRequest": undefined,
			"blinkHeaders": undefined,
			"Response": undefined,
			"FormData": undefined,
			"Request": undefined,
			"Headers": undefined,
			
			// external
			"Exit": undefined,
			
			_GetParam,
			_SetParam,
			
			...globalFix,
			
			...obj,
		};
		
		const handler = {
			get(target, property){
				if(property === "_")return ScopeRegister(target);
				else if (ScopeCheck(target))return target[property];
				console.log("NO");
			},
			set(target, property, value){
				//log("set", { target, property, value });
				target[property] = value;
				return true; // Atamanın başarılı olduğunu belirtir
			},
			has(target, property){
				if(property === "_")return ScopeRegister(target);
				else if(ScopeCheck(target))return property in target;
				console.log("NO");
				return false;
			},
			apply(target, thisArg, argumentsList) {
				//log("apply", { target, thisArg, argumentsList });
				return target.apply(thisArg, argumentsList);
			},
			construct(target, args){
				//log("construct", { target, args });
				return new target(...args);
			},
			
			defineProperty(target, property, attributes){
				//log("defineProperty", { target, property, attributes });
				return Object.defineProperty(target, property, attributes);
			},
			deleteProperty(target, property){
				//log("deleteProperty", { target, property, value });
				delete target[property];
				return true;
			},
			
			getOwnPropertyDescriptor(target, property){
				//log("getOwnPropertyDescriptor", { target, property, value });
				return Object.getOwnPropertyDescriptor(target, property);
			},
			isExtensible(target){
				//log("isExtensible", { target, property, value });
				return Object.isExtensible(target);
			},
			ownKeys(target){
				//log("ownKeys", { target, property, value });
				return Object.keys(target);
			},
			preventExtensions(target){
				//log("preventExtensions", { target });
				return Object.preventExtensions(target);
			},
			
			setPrototypeOf(target, value){
				//log("setPrototypeOf", { target, property, value });
				return Object.setPrototypeOf(target, prototype);
			},
			getPrototypeOf(target){
				//log("getPrototypeOf", { target, property, value });
				return Object.getPrototypeOf(target);
			},
		};
		
		return new Proxy(globals, handler);
	};
	
	const RunTS = (code="", obj={}, args=[])=>{
		try{
			return RunJS(code, {...obj}, [...args]);
		}catch(e){
			return e;
		}
	};
	
	const RunJS = (code="", obj={}, args=[])=>{
		try{
			const sandbox = GenerateDefault(obj);//, console.log);
			const compiled = "with(this){_;(" + "" + "()=>{" + code + "})();}";
			return Function(compiled).apply(sandbox, [...args]);
		}catch(e){
			//console.warn(e);
			throw e;
		}
	};
	
	const Require = (path, obj={}, args=[])=>{
		return RunJS(ATA.FS.readFileSync(ATA.Path.join(ATA.CWD, path), {
			encoding: "utf8"
		}), obj, [...args]);
	};
	
	return{
		RunJS,
		RunTS,
		Require,
	};
})(ATA());