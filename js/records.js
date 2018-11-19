const api = new API();
var closBtn = document.getElementById("closure");
var recordBtn = document.getElementById("recordBtn");
var modalOpen = document.getElementById("modal");
var token = localStorage.getItem("token");
var sales_url = "https://store-manager-challenge-3.herokuapp.com/api/v2/sales";

closBtn.addEventListener("click", closeWindow);
recordBtn.addEventListener("click", openWindow);
window.addEventListener("click", outSideClose);

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
