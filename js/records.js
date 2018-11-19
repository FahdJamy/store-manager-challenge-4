const api = new API();
var closBtn = document.getElementById("closure");
var recordBtn = document.getElementById("recordBtn");
var modalOpen = document.getElementById("modal");
var token = localStorage.getItem("token");
var sales_url = "https://store-manager-challenge-3.herokuapp.com/api/v2/sales";
var createSaleUrl =
	"https://store-manager-challenge-3.herokuapp.com/api/v2/sales";

var createSaleRec = document.getElementById("createSaleBtn");

closBtn.addEventListener("click", closeWindow);
recordBtn.addEventListener("click", openWindow);
window.addEventListener("click", outSideClose);
createSaleRec.addEventListener("click", createSalesRecord);

//// Close modal view on click of "x" close btn ////
function closeWindow() {
	modalOpen.style.display = "none";
}
//// Open modal view on click of "View detail" btn ////
function openWindow() {
	modalOpen.style.display = "block";
}
//// Close modal view on outside click of modal view ////
function outSideClose(e) {
	if (e.target === modalOpen) {
		modalOpen.style.display = "none";
	}
}

////// Get all available sale records
api.get_token(sales_url, token)
	.then(data => {
		const salesContainer = document.getElementById("salesRecs");
		var salesRecords = data["sales"];
		for (var i = 0; i < salesRecords.length; i++) {
			var catName = salesRecords[i]["category"];
			var createdBy = salesRecords[i]["created_by"];
			var dateOn = salesRecords[i]["created_on"];
			var pdtPrice = salesRecords[i]["price"];
			var pdtName = salesRecords[i]["product_name"];
			var qnty = salesRecords[i]["quantity"];
			var revenue = salesRecords[i]["total_amount"];
			salesContainer.innerHTML += `<div class="record">
					<img src="img/timber.jpg" alt="alt_name" class="item_img">
					<div class="rec">
						<h3>Timberland</h3>
						<div class="record_info">
							<span>Category</span>
							<span>${pdtName}</span>
							<span>Category</span>
							<span>${catName}</span>
							<span>Price</span>
							<span>${pdtPrice} a piece</span>
							<span>Quantiy</span>
							<span>${qnty}</span>
							<span>Date</span>
							<span>${dateOn}</span>
							<span>Total Amount Generated</span>
							<span>${revenue}</span>
							<span>Created By</span>
							<span>${createdBy}</span>
						</div>
					</div>
				</div>`;
		}
	})
	.catch(error => console.log(error));

///// Create new sales record
function createSalesRecord(e) {
	var product = document.getElementById("product").value;
	var quantitySold = document.getElementById("qnty").value;
	var messagee = document.getElementById("mesg");
	if (product === "" && quantitySold === "") {
		messagee.innerHTML = `Sorry, all fields are required.`;
		messagee.className = "msgInfo";
	} else {
		var data = {
			name: String(product.charAt(0).toUpperCase() + product.slice(1)),
			quantity: parseInt(quantitySold)
		};
		api.post(createSaleUrl, data, token)
			.then(response => {
				if (
					response["message"] ===
					"sorry an admin cant create a sales record"
				) {
					localStorage.removeItem("token");
					localStorage.removeItem("username");
					window.location.href = "index.html";
					alert("Log in as a sales attendant first");
				} else if (
					response["message"] ===
					"sorry, You provided an invalid token"
				) {
					localStorage.removeItem("token");
					localStorage.removeItem("username");
					window.location.href = "index.html";
					alert("Log in as a sales attendant first");
				} else if (
					response["message"] ===
					"sorry cant make a sale record of a product that doesnt exist in the db"
				) {
					messagee.innerHTML = `${response["message"]}`;
					messagee.className = "msgInfo";
				} else if (
					response["message"] === "sorry, product is out of stock"
				) {
					messagee.innerHTML = `${response["message"]}`;
					messagee.className = "msgInfo";
				} else if (
					response["message"] ===
					"cant make sale, current_stock is less than provided quantity"
				) {
					messagee.innerHTML = `${response["message"]}`;
					messagee.className = "msgInfo";
				} else if (response["message"] === "sale record created") {
					messagee.innerHTML = `${response["message"]}`;
					messagee.className = "msgInfoSuccess";
				}
			})
			.catch(error => console.log(error));
	}
	e.preventDefault();
}
