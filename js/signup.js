const api = new API;
var signup_url = 'https://store-manager-challenge-3.herokuapp.com/api/v2/auth/signup';

const new_username = document.getElementById('username');
const password = document.getElementById('pass');
const confirm_password = document.getElementById('c_pass');
const signupButton = document.getElementById('create_user');
const msgBody = document.getElementById('invalid')

signupButton.addEventListener('click', (e) => {
	console.log('created')
});