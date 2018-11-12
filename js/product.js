const api = new API;
const create_product_url = 'https://store-manager-challenge-3.herokuapp.com/api/v2/categories'
var token = localStorage.getItem("token");

const pdt_name = document.getElementById('c_product');
const pdt_price = document.getElementById('p_price');
const quantity = document.getElementById('stock');
const category = document.getElementById('categoryName');

const sndButton = document.getElementById('createPdt');
const msgBody = document.getElementById('message')

sndButton.addEventListener('click', (e) => {
	console.log('ready')
	var productInfo = {
		name:String(pdt_name.value),
		category:String(category.value),
		quantity:parseInt(quantity.value),
		price:parseInt(pdt_price.value)
	}
	if (pdt_name.value === "" || category.value === "" || quantity.value === "" || pdt_price.value === "") {
			msgBody.innerHTML = 'please first fill in all fields before creating a new product';
		}
	api.post(create_product_url, productInfo, token)
		.then((data) => console.log(data))
		.catch( error => {
			console.log(error)
			msgBody.innerHTML = 'sorry we having problems now, please try again later'
		});
	e.preventDefault();
})