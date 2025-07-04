// Default Service runs auto on Run mode

Setup(()=>{
	Queue("order", [
	(OK, NO)=>{
		const lib = Library.Default;
		lib.Execute();
		lib.Promise.then(OK).catch(NO);
	},
	(OK, NO)=>{
		const con = Controller.Default;
		con.Execute();
		con.Promise.then(OK).catch(NO);
	},
	(OK_, NO_)=>{
		
		OK_(true);
		OK(true);
	},
	]);
});