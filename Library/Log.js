module.exports=((ATA)=>{
	const Path = "./Log/";
	
	return(class_)=>{
		const _Assert = Symbol();
		const _Clear = Symbol();
		const _Debug = Symbol();
		const _Error = Symbol();
		const _Info = Symbol();
		const _Log = Symbol();
		const _Warn = Symbol();
		return class extends class_{
			[_Assert] = null;
			[_Clear] = null;
			[_Debug] = null;
			[_Error] = null;
			[_Info] = null;
			[_Log] = null;
			[_Warn] = null;
			constructor(config){
				super({
					Path,
					...config,
				});
				this[_Assert] = ()=>{};
				this[_Clear] = ()=>{};
				this[_Debug] = ()=>{};
				this[_Error] = ()=>{};
				this[_Info] = ()=>{};
				this[_Log] = ()=>{};
				this[_Warn] = ()=>{};
			};
			
			get Type(){
				return "Log";
			};
			
			LoadRoot(){
				return this.LoadSandBox();
			};
			
			LoadSandBox(){
				try{
					super.LoadSandBox({
						assert: console.assert,
						clear: console.clear,
						debug: console.debug,
						error: console.error,
						info: console.info,
						log: console.log,
						warn: console.warn,
						
						KeyAssert: _Assert,
						KeyClear: _Clear,
						KeyDebug: _Debug,
						KeyError: _Error,
						KeyInfo: _Info,
						KeyLog: _Log,
						KeyWarn: _Warn,
						
						FS: ATA.FS,
					});
				}catch(e){
					this.NO(e);
					return e;
				}
			};
			
			get Assert(){
				return this[_Assert];
			};
			set Assert(obj){
				
			};
			
			get Clear(){
				return this[_Clear];
			};
			set Clear(obj){
				
			};
			
			get Debug(){
				return this[_Debug];
			};
			set Debug(obj){
				
			};
			
			get Error(){
				return this[_Error];
			};
			set Error(obj){
				
			};
			
			get Info(){
				return this[_Info];
			};
			set Info(obj){
				
			};
			
			get Log(){
				return this[_Log];
			};
			set Log(obj){
				
			};
			
			get Warn(){
				return this[_Warn];
			};
			set Warn(obj){
				
			};
		};
	};
})(ATA());