const api = new API;
const create_product_url = 'https://store-manager-challenge-3.herokuapp.com/api/v2/categories'

const pdt_name = document.getElementById('c_product');
const pdt_price = document.getElementById('p_price');
const quantity = document.getElementById('stock');
const category = document.getElementById('categoryName');

const sndButton = document.getElementById('createPdt');
const msgBody = document.getElementById('message')

sndButton.addEventListener('click', (e) => {
	console.log('ready')
	e.preventDefault();
})