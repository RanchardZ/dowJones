

let stockReducer = function(stocks = [], action) {
	switch (action.type) {
		case 'ADD_TO_STOCK':
			// console.log('in addToStock');
			return [...stocks, {
						abbr: action.abbr,
						daily: action.daily
					}];
		case 'REMOVE_FROM_STOCK':
			let new_stocks = [];
			for(let i=0; i<stocks.length; i++) {
				if (stocks[i].abbr !== action.abbr)
					new_stocks.push(stocks[i]);
			}
			console.log(new_stocks);
			return new_stocks;
		default:
			return  stocks;
	}
}

export default stockReducer