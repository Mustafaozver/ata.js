module.exports=((ATA)=>{
	
	const Version = (()=>{
		const V0 = Symbol();
		const V1 = Symbol();
		const V2 = Symbol();
		const V3 = Symbol();
		const V4 = Symbol();
		
		const sign = Symbol();
		const Time = Symbol();
		const Type = Symbol();
		
		const Class = class{
			[V0] = 0;
			[V1] = 0;
			[V2] = 0;
			[V3] = 0;
			[V4] = 0;
			[sign] = "";
			[Time] = null;
			[Type] = "ALPHA";
			
			constructor(time=0, v0=0, v1=0, v2=0, v3=0, v4=0, type="ALPHA"){
				if(time instanceof Array){
					v0 = time[1] - 0;
					v1 = time[2] - 0;
					v2 = time[3] - 0;
					v3 = time[4] - 0;
					v4 = time[5] - 0;
					type = time[6];
					time = time[0] - 0;
				}
				this[Time] = new Date(time);
				this[V0] = v0 - 0;
				this[V1] = v1 - 0;
				this[V2] = v2 - 0;
				this[V3] = v3 - 0;
				this[V4] = v4 - 0;
				this[Type] = type;
			};
			
			get Date(){
				return this[Time];
			};
			
			get Sign(){
				return this[sign];
			};
			
			get Version0(){
				const v = this[V0];
				if(v instanceof Number && n >= 0)return v;
				return 0;
			};
			
			set Version0(v=0){
				this[V0] = v - 0;
			};
			
			get Version1(){
				const v = this[V1];
				if(v instanceof Number && n >= 0)return v;
				return 0;
			};
			
			set Version1(v=0){
				this[V1] = v - 0;
			};
			
			get Version2(){
				const v = this[V2];
				if(v instanceof Number && n >= 0)return v;
				return 0;
			};
			
			set Version2(v=0){
				this[V2] = v - 0;
			};
			
			get Version3(){
				const v = this[V3];
				if(v instanceof Number && n >= 0)return v;
				return 0;
			};
			
			set Version3(v=0){
				this[V3] = v - 0;
			};
			
			get Version4(){
				const v = this[V4];
				if(v instanceof Number && n >= 0)return v;
				return 0;
			};
			
			set Version4(v=0){
				this[V4] = v - 0;
			};
			
			get VersionP(){
				return this.Sign + this.Version0 + "." + this.Version1 + "." + this.Version2;
			};
			
			get VersionF(){
				return this.Sign + this.Version0 + "." + this.Version1 + "." + this.Version2 + "." + this.Version3 + "-" + this.Version4 + (this[Type] ? ("-" + this[Type]) : "");
			};
			
			Upgrade(i=1){
				this.Increase(0, i);
			};
			
			Update(minor=false, i=1){
				if(minor)this.Increase(1, i);
				else this.Increase(2, i);
			};
			
			Push(i=1){
				this.Increase(3, i);
			};
			
			Cycle(i=1){
				this.Increase(4, i);
			};
			
			Increase(n=0, i=1){
				switch(n){
					case 0:
						this[V0] += i;
					break;
					case 1:
						this[V1] += i;
					break;
					case 2:
						this[V2] += i;
					break;
					case 3:
						this[V3] += i;
					break;
					case 4:
						this[V4] += i;
					break;
				};
			};
		};
		
		return Class;
	})();
	
	return{
		Version
	};
})(ATA());