const api = new API;
var signup_url = 'https://store-manager-challenge-3.herokuapp.com/api/v2/auth/signup';
var token = localStorage.getItem("token");

const new_username = document.getElementById('username');
const user_phone_no = document.getElementById('phone_no');
const passcode = document.getElementById('pass');
const confirm_password = document.getElementById('c_pass');
const signupButton = document.getElementById('create_user');
const msgBody = document.getElementById('invalid')

signupButton.addEventListener('click', (e) => {
	if (new_username.value === ""|| user_phone_no.value === "" || passcode.value === "") {
		msgBody.innerHTML = 'sorry all fields must be filled in';
	} else if (confirm_password.value !== passcode.value) {
		msgBody.innerHTML = 'password and confirm password must be equal';
	} else if ((passcode.value).length < 5 || (user_phone_no.value).length < 5) {
		msgBody.innerHTML = 'both phone Nummber and password should atleast be 6 charcters more';
	} else if ((new_username.value).length < 3) {
		msgBody.innerHTML = 'username should be atleast 3 characters';
	} else {
		var user_data = {
			username:(new_username.value).toString(),
			password:String(passcode.value),
			phone_no:parseInt(user_phone_no.value)
		}
		api.post(signup_url, user_data, token)
			.then(data => {
				if (data['message'] === 'sorry username is already taken') {
					msgBody.innerHTML = 'sorry that username is already taken';
					msgBody.className = "danger_txt";
				}  else if (data['message'] === 'sorry username shouldnt have a special character including ($#@%)') {
					msgBody.innerHTML = `${data['message']}`;
				} else if (data['message'] === 'User succefully registered') {
					msgBody.innerHTML = 'User account succefully created';
					msgBody.className = "success_txt";
				}
				console.log(data)
			})
			.catch(error => {
				msgBody.innerHTML = 'We are experiencing some difficulties now, please try again later';
				console.log(error)
			})
	}
});