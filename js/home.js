const api = new API();
const productContainer = document.getElementById("pdtContainer");
var productsUrl =
	"https://store-manager-challenge-3.herokuapp.com/api/v2/products";

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
					<button class="btn detailBtn" id="${pdtId}">View details</button>
				</div>
				`;
		}
	})
	.catch(err => console.log(err));

// View product details
productContainer.addEventListener("click", getProductDetails);

function getProductDetails(e) {
	// if view product button is clicked
	if (e.target.classList.contains("detailBtn")) {
		var productId = e.target.attributes.getNamedItem("id").value;
		const singlePdtUrl = `https://store-manager-challenge-3.herokuapp.com/api/v2/products/${productId}`;

		api.get(singlePdtUrl)
			.then(data => {
				var pdtInfo = data["product"];
				var details = document.getElementById("pdtInfo");
				var pdtName = pdtInfo["product_name"];
				var pdtCategory = pdtInfo["category"];
				var pdtPrice = pdtInfo["price"];
				var pdtQuantuty = pdtInfo["stock"];
				details.innerHTML += `
					<h2>${pdtName}</h2>
					<p>${pdtName} is in belogs to the ${pdtCategory} category</p>
					<p>Stock left is ${pdtQuantuty} pieces</p>
					<p>This product price is at ${pdtPrice} per piece</p>
				`;
				modalOpen.style.display = "block";
				console.log(data);
			})
			.catch(err => console.log(err));
	}
	e.preventDefault();
}
