const api = new API();
const create_product_url =
	"https://store-manager-challenge-3.herokuapp.com/api/v2/products";
var token = localStorage.getItem("token");

const pdt_name = document.getElementById("c_product");
const pdt_price = document.getElementById("p_price");
const quantity = document.getElementById("stock");
const category = document.getElementById("categoryName");

const sndButton = document.getElementById("createPdt");
const msgBody = document.getElementById("message");

// Perform the following action once the Create new product button is clicked.

sndButton.addEventListener("click", e => {
	// Capitalize category name and product name first
	var productName = String(
		pdt_name.value.charAt(0).toUpperCase() + pdt_name.value.slice(1)
	);
	var category_name = String(
		category.value.charAt(0).toUpperCase() + category.value.slice(1)
	);
	console.log("ready");
	var productInfo = {
		name: productName,
		category: category_name,
		quantity: parseInt(quantity.value),
		price: parseInt(pdt_price.value)
	};
	if (
		pdt_name.value === "" ||
		category.value === "" ||
		quantity.value === "" ||
		pdt_price.value === ""
	) {
		msgBody.innerHTML =
			"please first fill in all fields before creating a new product";
		msgBody.className = "message";
	} else if (pdt_name.value.length < 2 || category.value.length < 2) {
		msgBody.innerHTML =
			"product name and category should atleast be 3 characters";
		msgBody.className = "message";
	}
	api.post(create_product_url, productInfo, token)
		.then(data => {
			console.log(data);
			if (
				data["message"] ===
				`category name ${category_name} doesnot exist`
			) {
				msgBody.innerHTML = `${data["message"]}`;
				msgBody.className = "message";
			} else if (
				data["message"] ===
				`sorry product with name ${productName} already exists`
			) {
				msgBody.innerHTML = `${data["message"]}`;
			} else if (
				data["message"] ===
				"sorry product name shouldnt have a special character including ($#@%)"
			) {
				msgBody.innerHTML = `${data["message"]}`;
				msgBody.className = "message";
			} else if (
				data["message"] === `product has been created successfully!!!`
			) {
				msgBody.innerHTML = `${data["message"]}`;
				msgBody.className = "successMsg";
			} else if (
				data["message"] ===
				"sorry u not an admin, u cant access this endpoint"
			) {
				localStorage.removeItem("token");
				localStorage.removeItem("username");
				window.location.href = "index.html";
				alert("Log in as an admin first");
			}
		})
		.catch(error => {
			console.log(error);
			msgBody.innerHTML =
				"sorry we having problems now, please try again later";
			msgBody.className = "message";
		});
	e.preventDefault();
});
