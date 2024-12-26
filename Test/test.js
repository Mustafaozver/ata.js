(function(ATA){
	var assert = require("assert");
	describe("Step 1: start", function(){
		it("Version Control", function(done){
			var ver = "" + ATA;
			assert.equal("ATA.JS for Node.JS V(Beta 9.0.5.0-00)", ver)
			done();
		});
		it("Setup test", function(done){
			ATA.Setups.push(function(){
				done();
			});
		});
		it("Loop test", function(done){
			var loop_ = function(){
				done();
				loop_ = function(){};
			};
			ATA.Loops.push(function(){
				loop_();
			});
		});
		it("Loop test for counter", function(done){
			this.timeout(5000);
			var count = 0;
			var loop_ = function(){
				if((count++) > 1){
					done();
					loop_ = function(){};
				}
			};
			ATA.Loops.push(function(){
				loop_();
			});
		});
	});
})(require("../index")());