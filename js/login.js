const api = new API;
var login_url = 'https://store-manager-challenge-3.herokuapp.com/api/v2/auth/login';

const user = document.getElementById('username');
const passwrd = document.getElementById('pass');
const loginButton = document.getElementById('loginBtn');
const msgBody = document.getElementById('invalid')


loginButton.addEventListener('click', (e) => {
	var user_data = {
		username:user.value,
		password:passwrd.value
	}

	api.login(login_url, user_data)
	.then(data => {
		const user_name = (user.value)
		username = (user_name.charAt(0).toUpperCase() + user_name.slice(1));
		console.log(username)
		if (data['message'] === 'sorry username and password dont match, please login with valid credentials') {
			msgBody.innerHTML = `${data['message']}`
		} else if (data['message'] === `Sorry user ${username} doesnot exist, login with valid credentials`) {
			msgBody.innerHTML = 'You tried to login with a username that doesnot exist, login with valid credentials'
		} else if (user.value === 'admin' && passwrd.value === '123') {
			token = data['token']
			localStorage.setItem('token',token);
			localStorage.setItem('username',username);
			window.location.href = 'admin.html';
		} else {
			token = data['token']
			localStorage.setItem('token',token);
			localStorage.setItem('username',username);
			window.location.href = 'home.html';
			// console.log(data);
		}
	})
	.catch( error => {
		console.log(error)
		msgBody.innerHTML = 'sorry we having problems now, please try again later'
	});
	e.preventDefault();
});