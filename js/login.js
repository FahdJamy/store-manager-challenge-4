const api = new API;
var login_url = 'https://store-manager-challenge-3.herokuapp.com/api/v2/auth/login';

const user = document.getElementById('username');
const passwrd = document.getElementById('pass');
const loginButton = document.getElementById('loginBtn');


loginButton.addEventListener('click', (e) => {
	var user_data = {
		username:user.value,
		password:passwrd.value
	}

	api.login(login_url, user_data)
	.then(data => {
		if (data['message'] === 'sorry username and password dont match, please login with valid credentials') {
			window.location.href = 'index.html';
			// console.log(data);
		} else if (data['message'] === `Sorry user ${user.value} doesnot exist, login with valid credentials`) {
			window.location.href = 'index.html';
			// console.log(data);
		} else if (user.value === 'admin' && passwrd.value === '123') {
			window.location.href = 'admin.html';
			console.log(data);
		} else {
			window.location.href = 'home.html';
			// console.log(data);
		}
	})
	.catch( error => console.log(error));
	e.preventDefault();
});