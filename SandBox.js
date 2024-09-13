module.exports = ((ATA)=>{
	const SHARE = {};
	
	const PrivateKey = Symbol();
	
	const _GetParam = (key="")=>{
		return SHARE[key + ""];
	};
	const _SetParam = (key="", value=false)=>{
		SHARE[key + ""] = value;
	};
	
	const GenerateDefault = (obj, log=()=>{})=>{
		const globals = {
			// İşletim Sistemi ve Çevresel Değişkenlere Erişim
			"process": null,
			"os": null,
			"path": null,
			"child_process": null,
			"fs": null,
			
			// Dinamik Kod Çalıştırma ve Zamanlayıcı Fonksiyonlar
			"eval": null,
			"Function": null,
			"setTimeout": null,
			"setInterval": null,
			"setImmediate": null,
			"clearTimeout": null,
			"clearInterval": null,
			"clearImmediate": null,
			
			// Kullanıcı Tanımlı Global Nesneler
			"ATA": null,
			"ANA": null,
			
			// Global ve Belge Nesnesine Erişim
			"global": null,
			"globalThis": null,
			"parent": null,
			"window": null,
			"document": null,
			"self": null,
			"top": null,
			"frames": null,
			"frameElement": null,
			
			// Ağ İletişimi ve Veri Depolama
			"navigator": null,
			"location": null,
			"origin": null,
			"external": null,
			"fetch": null,
			"XMLHttpRequest": null,
			"WebSocket": null,
			"localStorage": null,
			"sessionStorage": null,
			"indexedDB": null,
			"cookieStore": null,
			
			// Kriptografik İşlemler ve Güvenlik
			"crypto": null,
			
			// Kullanıcı Etkileşimleri
			"alert": null,
			"prompt": null,
			"confirm": null,
			"console": null,
			
			// Modül Sistemi ve Dosya Yol Bilgileri
			"require": null,
			"module": null,
			"exports": null,
			"__dirname": null,
			"__filename": null,
			
			// Tarayıcı ve Node.js Özel Nesneleri
			"Buffer": null,
			
			// Tarayıcı Fonksiyonları ve Nesneleri
			"onerror": null,
			"atob": null,
			"blur": null,
			"btoa": null,
			"cancelAnimationFrame": null,
			"cancelIdleCallback": null,
			"captureEvents": null,
			"close": null,
			"createImageBitmap": null,
			"find": null,
			"focus": null,
			"getComputedStyle": null,
			"getSelection": null,
			"matchMedia": null,
			"moveBy": null,
			"moveTo": null,
			"open": null,
			"postMessage": null,
			"print": null,
			"queueMicrotask": null,
			"releaseEvents": null,
			"reportError": null,
			"requestAnimationFrame": null,
			"requestIdleCallback": null,
			"resizeBy": null,
			"resizeTo": null,
			"scroll": null,
			"scrollBy": null,
			"scrollTo": null,
			"stop": null,
			"structuredClone": null,
			"webkitCancelAnimationFrame": null,
			"webkitRequestAnimationFrame": null,
			"getScreenDetails": null,
			"openDatabase": null,
			"queryLocalFonts": null,
			"showDirectoryPicker": null,
			"showOpenFilePicker": null,
			"showSaveFilePicker": null,
			"webkitRequestFileSystem": null,
			"webkitResolveLocalFileSystemURL": null,
			
			// Fetch API ve İlgili Nesneler
			"fetch": null,
			"blinkfetch": null,
			"blinkResponse": null,
			"blinkFormData": null,
			"blinkRequest": null,
			"blinkHeaders": null,
			"Response": null,
			"FormData": null,
			"Request": null,
			"Headers": null,
			
			// external
			"Exit": null,
			
			_GetParam,
			_SetParam,
			
			...obj,
		};
		
		const handler = {
			get(target, property){
				log("get", { target, property });
				return target[property];
			},
			set(target, property, value){
				log("set", { target, property, value });
				target[property] = value;
				return true; // Atamanın başarılı olduğunu belirtir
			},
			has(target, property){
				log("has", { target, property });
				return property in target;
			},
			apply(target, thisArg, argumentsList) {
				log("apply", { target, thisArg, argumentsList });
				return target.apply(thisArg, argumentsList);
			},
			construct(target, args){
				log("construct", { target, args });
				return new target(...args);
			},
			
			defineProperty(target, property, attributes){
				log("defineProperty", { target, property, attributes });
				return Object.defineProperty(target, property, attributes);
			},
			deleteProperty(target, property){
				log("deleteProperty", { target, property, value });
				delete target[property];
				return true;
			},
			
			getOwnPropertyDescriptor(target, property){
				log("getOwnPropertyDescriptor", { target, property, value });
				return Object.getOwnPropertyDescriptor(target, property);
			},
			isExtensible(target){
				log("isExtensible", { target, property, value });
				return Object.isExtensible(target);
			},
			ownKeys(target){
				log("ownKeys", { target, property, value });
				return Object.keys(target);
			},
			preventExtensions(target){
				log("preventExtensions", { target });
				return Object.preventExtensions(target);
			},
			
			setPrototypeOf(target, value){
				log("setPrototypeOf", { target, property, value });
				return Object.setPrototypeOf(target, prototype);
			},
			getPrototypeOf(target){
				log("getPrototypeOf", { target, property, value });
				return Object.getPrototypeOf(target);
			},
		};
		
		return new Proxy(globals, handler);
	};
	
	const RunJS = (code="", obj={}, args=[])=>{
		try{
			const sandbox = GenerateDefault(obj);//, console.log);
			return Function("try{with(this){" + code + "}}catch(e){return e}").apply(sandbox, [...args]);
		}catch(e){
			return e;
		}
	};
	
	const Require = (path, obj={}, args=[])=>{
		return RunJS(ATA.FS.readFileSync(ATA.Path.join(ATA.CWD, path), {
			encoding: "utf8"
		}), obj, [...args]);
	};
	
	return{
		RunJS,
		Require,
	};
})(ATA());