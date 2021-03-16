
function makeGETRequest(url, callback) {
	var xhr;

	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			callback(xhr.responseText);
		}
	}

	xhr.open('GET', url, true);
	xhr.send();
}


class Api {
	constructor() {
		this.url = '/~goods.json';
	}

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

		xhr.open('GET', this.url, true);
		xhr.send();

	}

	fetchPromise() {
		new Promise((resolve, reject) => {
			this.fetch(resolve, reject);
		})
	}
}


class GoodsItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}

	getHTML() {
		return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
	}
}

class GoodsList {
	constructor() {
		this.api = new Api();
		this.$goodsList = document.querySelector('.goods-list');
		this.goods = [];

		//this.api.fetch(this.onFetchError.bind(this), this.onFetchSuccess.bind(this));

		this.api.fetchPromise() 
			.then((data) => {this.onFetchSuccess(data)})
			.catch((err) => {rhis.onFetchError(err)});
	}	

	onFetchSuccess(data) {
		this.goods = data.map(({title, price}) => new GoodsItem(title, price));
		this.render();
	}

	onFetchError() {
		this.$goodsList.insertAdjacentHTML('beforeend', '<h3>${err}</h3>');
		}

	render() {
		this.$goodsList.textContent = '';
		this.goods.forEach((good) => {
			this.$goodsList.insertAdjacentHTML('beforeend', good.getHTML());		
		})	
	}

}


const goodsList = new GoodsList();



// ПРИМЕР PRIMISE

// const live = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('I`m alive');
// 	}, 5000);
// });

// live.then((data) => {
// 	console.log(data);
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			reject('I`m alive too');
// 		}, 2000);
// 	});
// }).then(data => {
// 	console.log(data);
// }).catch(() => {
// 	console.log('Все пропало')
// })
