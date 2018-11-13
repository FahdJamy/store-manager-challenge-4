const api = new API;
const create_product_url = 'https://store-manager-challenge-3.herokuapp.com/api/v2/products'
var token = localStorage.getItem("token");

const pdt_name = document.getElementById('c_product');
const pdt_price = document.getElementById('p_price');
const quantity = document.getElementById('stock');
const category = document.getElementById('categoryName');

const sndButton = document.getElementById('createPdt');
const msgBody = document.getElementById('message')

// Capitalize category name and product name first

sndButton.addEventListener('click', (e) => {
	var productName = String(pdt_name.value.charAt(0).toUpperCase() + pdt_name.value.slice(1));
	var category_name = String(category.value.charAt(0).toUpperCase() + category.value.slice(1));
	console.log('ready')
	var productInfo = {
		name:productName,
		category:category_name,
		quantity:parseInt(quantity.value),
		price:parseInt(pdt_price.value)
	}
	if (pdt_name.value === "" || category.value === "" || quantity.value === "" || pdt_price.value === "") {
			msgBody.innerHTML = 'please first fill in all fields before creating a new product';
		} else if (pdt_name.value.length < 2 || category.value.length < 2) {
			msgBody.innerHTML = 'product name and category should atleast be 3 characters';
		}
	api.post(create_product_url, productInfo, token)
		.then((data) => {
			console.log(data)
			if (data['message'] === `category name ${category_name} doesnot exist`) {
				msgBody.innerHTML = `${data['message']}`;
			} else if (data['message'] === `sorry product with name ${productName} already exists`) {
				msgBody.innerHTML = `${data['message']}`;
			}
		})
		.catch( error => {
			console.log(error)
			msgBody.innerHTML = 'sorry we having problems now, please try again later'
		});
	e.preventDefault();
})