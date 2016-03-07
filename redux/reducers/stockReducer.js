

let stockReducer = function(stocks = [], action) {
	switch (action.type) {
		case 'ADD_TO_STOCK':
			// console.log('in addToStock');
			return [{
						abbr: action.abbr,
						daily: action.daily
					}, ...stocks]
		default:
			return  stocks;
	}
}

export default stockReducer