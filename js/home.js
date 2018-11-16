const api = new API;
const productContainer = document.getElementById('pdtContainer');
var productsUrl = 'https://store-manager-challenge-3.herokuapp.com/api/v2/products';

api.get(productsUrl)
	.then(data => {
		const products = data["Products"];
		for (var i = 0; i < products.length; i++) {
			var pdtId = products[i]["id"];
			var pdtName = products[i]["product_name"];
			var pdtCategory = products[i]["category"];
			var pdtPrice = products[i]["price"];
			var pdtQuantuty = products[i]["stock"];

			productContainer.innerHTML += `
				<div class="product">
					<img src="img/productImage.png" alt="alt_name" class="pdt_img">
					<h5 class="pdt_name">${pdtName}</h5>
					<button class="btn" id="${pdtId}">View details</button>
				</div>
				`;
		}
	})
	.catch(err => console.log(err));