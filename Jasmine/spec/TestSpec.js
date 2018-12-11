describe("Testing the functionality, logging in a user", () => {
	beforeEach (() => {
		let user_1 = {
			username: "admin",
			pass: '123'
		};
	});

	it("should login a user", () => {
		let api = new API();
		var userInfo = {
			username: "admin",
			password: "123"
		};
		let response = api.login('https://store-manager-challenge-3.herokuapp.com/api/v2/auth/login',userInfo);
		response.then(data=>{
			const resp = data;
		});
		var username = localStorage.getItem("username");
		expect(username).toBeNull();
	});
});

