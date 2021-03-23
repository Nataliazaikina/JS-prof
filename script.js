
// function makeGETRequest(url, callback) {
// 	var xhr;

// 	if (window.XMLHttpRequest) {
// 		xhr = new XMLHttpRequest();
// 	} else if (window.ActiveXObject) {
// 		xhr = new ActiveXObject('Microsoft.XMLHTTP');
// 	}

// 	xhr.onreadystatechange = function() {
// 		if (xhr.readyState === 4) {
// 			callback(xhr.responseText);
// 		}
// 	}

// 	xhr.open('GET', url, true);
// 	xhr.send();
// }


const API_URL = '/goods.json';

const vue = new Vue({
	el: "#app",
	data: {
		goods: [],
		filtredGoods: [],
		cart: [],
		search: '',
		isCartOpen: false,
	},
	methods: {
		openCartHandler() {
			this.isCartOpen = !this.isCartOpen;
		}

		searchHandler() {
			if(this.search === '') {
				this.filtredGoods = this.goods;
			}
			const regexp = new RegExp(this.search, 'gi');
			this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
		},

		addToCart(e) {
			//console.log(e);
			const index = e.target.dataset.index;
			this.cart.push(this.filtredGoods[index]);
		},

		removeCartHandler() {
			const index = e.target.dataset.index;
			this.cart.splice(index - 1, 1);
		},

	fetch(error,success) {
		let xhr;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');			
		}

		xhr.onreadystatechange = function() {
			console.log(xhr.readyState);
			console.log(xhr.status);
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					success(JSON.parse(xhr.responseText));
				} else if(xhr.status > 400) {
					error("все пропало");
				}
			}
		}

		xhr.open('GET', API_URL, true);
		xhr.send();
	},
	
	fetchPromise() {
		return new Promise((resolve, reject) => {
			this.fetch(resolve, reject);
		})
	}	
	},
	mounted() {
		this.fetchPromise()
			.then(data => {
				this.goods = data;
				this.filtredGoods = data;
			})
			.catch(err => {
				console.log(err);
			})
	}
})


