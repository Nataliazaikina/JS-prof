


class ApiMock {
	constructor() {

	}

	fetch() {
		return [
			{ title: 'Good1', price: 5 },
	   		{ title: 'Good2', price: 15 },
	   		{ title: 'Good3', price: 25 },
		];
	}
}

class GoodsItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}

	getHTML() {
		return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p>\n<button class="button-add">Добавить</button></div>`
	}
}

class GoodBestSeller extends GoodsItem {
	constructor (title, price) {
		super(title, price);

		this.discount = '15%';
	}

	getHTML() {
		// return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p>\n<button class="button-add">Добавить</button></div>`
		return `<H2>Бестселлер</H2>${super.getHTML()}`
	}
}

class GoodsList {
	constructor() {
		this.api = new ApiMock();
		this.$goodsList = document.querySelector('.goods-list');
		this.goods = [];
	}	

	fetchGoods() {
		this.goods = this.api.fetch().map(({title, price}) => new GoodBestSeller(title, price));
	}

	render() {
		this.$goodsList.textContent = '';
		this.goods.forEach((good) => {
			this.$goodsList.insertAdjacentHTML('beforeend', good.getHTML());
		})
	}

}

class ProductBasket {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}

	getHTML() {
		return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p>\n<button class="button-add">Добавить</button></div>`
	}
}

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();


