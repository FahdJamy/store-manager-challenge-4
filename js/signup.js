const api = new API;
var signup_url = 'https://store-manager-challenge-3.herokuapp.com/api/v2/auth/signup';
var token = localStorage.getItem("token");

const new_username = document.getElementById('username');
const phone = document.getElementById('phone_no');
const passcode = document.getElementById('pass');
const confirm_password = document.getElementById('c_pass');
const signupButton = document.getElementById('create_user');
const msgBody = document.getElementById('invalid')

signupButton.addEventListener('click', (e) => {
	console.log('created')
	var user_data = {
		username:new_username.value,
		phone_no:parseInt(phone.value),
		password:passcode.value
	}
	console.log(token)
	api.post(signup_url, user_data, token)
		.then(data => console.log(data))
		.catch(error => console.log(error))
});