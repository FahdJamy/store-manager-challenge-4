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

container.addEventListener('click', (e) => {
	if (e.target.classList.contains('updateBtn')) {
		console.log('working');
		modalOpen.style.display = "block";
	}
});

api.get(get_products)
	.then(data => {
		const products = data["Products"];
		console.log(products);
		for (var i = 0; i < products.length; i++) {
			var pdtId = products[i]["id"];
			var pdtName = products[i]["product_name"];
			var pdtCategory = products[i]["category"];
			var pdtPrice = products[i]["price"];
			var pdtQuantuty = products[i]["stock"];
			console.log(pdtId);
			console.log(pdtName);
			console.log(pdtCategory);
			console.log(pdtPrice);
			console.log(pdtQuantuty);
			console.log(products[i]);

			container.innerHTML += `<div class="product">
					<img src="img/productImage.png" alt="alt_name" class="pdt_img">
					<h5 class="pdt_name">${pdtName}</h5>
					<p>${pdtQuantuty} units peices in stock</p>
					<div class="actions">
						<button class="btn updateBtn" id="${pdtId}">Update product details</button>
						<button class="btn btnDel">Delete</button>
					</div>
				</div>`;
		}
	})
	.catch(err => console.log(err));

