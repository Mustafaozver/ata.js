#!/usr/bin/env node

((ATA)=>{
	ATA.Require(ATA.Path.join(ATA.MWD, "./App/Greeting.js"));
	ATA.Require(ATA.Path.join(ATA.MWD, "./App/Run_.js"));
})(require("../Core/Ata.js")());