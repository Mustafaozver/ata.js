// Default Service runs auto on Run mode

Setup(()=>{
	Queue("order", [
	(OK, NO)=>{
		const lib = Project.Library.Default;
		lib.Execute();
		lib.Promise.then(OK).catch(NO);
	},
	(OK, NO)=>{
		const con = Project.Controller.Default;
		con.Execute();
		con.Promise.then(OK).catch(NO);
	},
	(OK_, NO_)=>{
		
		OK_(true);
		OK(true);
	},
	]);
});