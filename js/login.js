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
	.then(data => console.log(data))
	.catch( error => console.log(error));

	// if (user.value === 'admin' && passwrd.value === '123') {
	// 	window.location.href = 'admin.html';
	// } else {
	// 	window.location.href = 'home.html';
	// }

	e.preventDefault();
});