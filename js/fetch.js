class API {
	// Mmethod for get. <noTokenRequired>
	async get (url) {
		const result = await fetch(url);
		const responseData = await result.json();
		return responseData;
	}
	// Mmethod for get. <token_required>
	async get_token (url, token) {
		const result = await fetch(url,{
			method : 'POST',
			headers : {
				'Content-type' : 'application/json',
				'token_key': token
			},
			body : JSON.stringify(data)
		});
		const responseData = await result.json();
		return responseData;
	}
	// Mmethod for post
	async login (url, data) {
		const result = await fetch (url, {
			method : 'POST',
			headers : {
				'Content-type' : 'application/json'
			},
			body : JSON.stringify(data)
		});

		const responseData = await result.json();
		return responseData;
	}
	// Method for post. <token_required>
	async post (url, data, token) {
		const result = await fetch (url, {
			method : 'POST',
			headers : {
				'Content-type' : 'application/json',
				'token_key': token
			},
			body : JSON.stringify(data)
		});
		const responseData = await result.json();
		return responseData;
	}
	// Method for put.
	async update (url, data, token) {
		const result = await fetch (url, {
			method : 'PUT',
			headers : {
				'Content-type' : 'application/json',
				'token_key': token
			},
			body : JSON.stringify(data)
		});
		const responseData = await result.json();
		return responseData;
	}
	// Method for delete
	async delete (url, token) {
		const response = await fetch ( url, {
			method : 'DELETE',
			headers : {
				'Content-type' : 'application/json',
				'token_key': token
			}
		});
		const requestRes = await response.json();
		return requestRes;
	}
}