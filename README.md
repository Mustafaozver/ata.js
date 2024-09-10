## ATA.JS Javascript life cycle system

Example:

''js
((ATA)=>{

    ATA.Setups.push(()=>{
		// it works for only 1 time
	});

    ATA.Loops.push(()=>{
		// it works forever, 1 time for a second.
	});

})(require("ata.js")());




ATA.Inject("./ss.js",{console}, []);

return;

''

 ``bash

 npx ata_init

 ``
