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
			// console.log(data);
		} else if (data['message'] === `Sorry user ${user.value} doesnot exist, login with valid credentials`) {
			// console.log(data);
		} else if (user.value === 'admin' && passwrd.value === '123') {
			token = data['token']
			username = user.value;
			localStorage.setItem('token',token);
			localStorage.setItem('username',username);
			window.location.href = 'admin.html';
			// console.log(data);
		} else {
			token = data['token']
			username = user.value;
			localStorage.setItem('token',token);
			localStorage.setItem('username',username);
			window.location.href = 'home.html';
			// console.log(data);
		}
	})
	.catch( error => console.log(error));
	e.preventDefault();
});