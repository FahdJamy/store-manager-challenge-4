let closBtn = document.getElementById("closure");
let modalOpen = document.getElementById("update_modal");

closBtn.addEventListener("click", closeWindow);
window.addEventListener("click", outSideClose);

//// Close modal view on click of "x" close btn ////
function closeWindow() {
	modalOpen.style.display = "none";
}
//// Open modal view on click of "View detail" btn ////
function openWindow() {
	modalOpen.style.display = "block";
}
// Add product
let addBtn = document.getElementById("create_pdt");
let addModal = document.getElementById("add_modal");
let closAddModal = document.getElementById("closeModalAdd");

addBtn.addEventListener("click", addProduct);
closAddModal.addEventListener("click", closeModalAdd);

function addProduct() {
	addModal.style.display = "block";
}

function closeModalAdd() {
	addModal.style.display = "none";
}

//// Close modal view on outside click of modal view ////
function outSideClose(e) {
	if (e.target === modalOpen) {
		modalOpen.style.display = "none";
	} else if (e.target === addModal) {
		addModal.style.display = "none";
	}
}

// Get all products
const get_products =
	"https://store-manager-challenge-3.herokuapp.com/api/v2/products";
const container = document.getElementById("adminProducts");

// Get all products available
api.get(get_products)
	.then(data => {
		const products = data["Products"];
		for (var i = 0; i < products.length; i++) {
			var pdtId = products[i]["id"];
			var pdtName = products[i]["product_name"];
			var pdtCategory = products[i]["category"];
			var pdtPrice = products[i]["price"];
			var pdtQuantuty = products[i]["stock"];

			container.innerHTML += `<div class="product">
					<img src="img/productImage.png" alt="alt_name" class="pdt_img">
					<h5 class="pdt_name">${pdtName}</h5>
					<p>${pdtQuantuty} units peices in stock at ${pdtPrice} each</p>
					<div class="actions">
						<button class="btn updateBtn" id="${pdtId}">Update product details</button>
						<button class="btn btnDel" id="${pdtId}">Delete</button>
					</div>
				</div>`;
		}
	})
	.catch(err => console.log(err));

// Update product information
var productId;
container.addEventListener("click", e => {
	// if update button is clicked
	if (e.target.classList.contains("updateBtn")) {
		modalOpen.style.display = "block";
		productId = e.target.attributes.getNamedItem("id").value;
		var updateButton = document.getElementById("updatePdt");
		updateButton.addEventListener("click", updateProductInfo);
	}
	// if delete button is clicked
	if (e.target.classList.contains("btnDel")) {
		productId = e.target.attributes.getNamedItem("id").value;
		if (confirm("Are sure you want to delete this product?")) {
			delete_url = `https://store-manager-challenge-3.herokuapp.com/api/v2/products/${productId}`;
			api.delete(delete_url, token)
				.then(response => {
					if (
						response["message"] ===
						"sorry u not an admin, u cant access this endpoint"
					) {
						localStorage.removeItem("token");
						localStorage.removeItem("username");
						window.location.href = "index.html";
						alert("Log in as an admin first");
					} else if (
						response["message"] ===
						"sorry, You provided an invalid token"
					) {
						localStorage.removeItem("token");
						localStorage.removeItem("username");
						window.location.href = "index.html";
						alert("Log in as an admin first");
					} else if (
						response["message"] ===
						`product with Id ${productId} has been deleted`
					) {
						alert("product has been deleted");
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
	e.preventDefault();
});

const msgHolder = document.getElementById("msgH");
// Update product function
function updateProductInfo(e) {
	var newPdtName = document.getElementById("newName").value;
	let newPdtPrice = document.getElementById("newPrice").value;
	let newPdtStock = document.getElementById("newStock").value;
	var newPdtCatedory = document.getElementById("newCat").value;
	const data = `https://store-manager-challenge-3.herokuapp.com/api/v2/products/${productId}`;
	if (newPdtPrice === "") {
		newPdtPrice = 0;
	}
	if (newPdtStock === "") {
		newPdtStock = 0;
	}

	var newPdtInfo = {
		name: String(newPdtName),
		price: parseInt(newPdtPrice),
		quantity: parseInt(newPdtStock),
		category: String(newPdtCatedory)
	};
	if (
		newPdtName === "" &&
		newPdtStock === 0 &&
		newPdtPrice === 0 &&
		newPdtCatedory === ""
	) {
		msgHolder.innerHTML = `sorry you cannot update product info with out atleast a field filled in`;
	} else
		api.update(data, newPdtInfo, token)
			.then(response => {
				if (
					response["message"] === "product info successfully updated"
				) {
					msgHolder.innerHTML = `${response["message"]}`;
				} else if (
					response["message"] ===
					"sorry you cant update a product info with a category that doesnot exist"
				) {
					msgHolder.innerHTML = `${response["message"]}`;
				} else if (
					response["message"] === "sorry product name already exist"
				) {
					msgHolder.innerHTML = `sorry that ${response["message"]}`;
				} else if (
					response["message"] ===
					"sorry u not an admin, u cant access this endpoint"
				) {
					localStorage.removeItem("token");
					localStorage.removeItem("username");
					window.location.href = "index.html";
					alert("Log in as an admin first");
				} else if (
					response["message"] ===
					"sorry, You provided an invalid token"
				) {
					localStorage.removeItem("token");
					localStorage.removeItem("username");
					window.location.href = "index.html";
					alert("Log in as an admin first");
				}
			})
			.catch(error => {
				console.log(error);
			});
	e.preventDefault();
}
