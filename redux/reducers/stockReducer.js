

let stockReducer = function(stocks = [], action) {
	switch (action.type) {
		case 'ADD_TO_STOCK':
			// console.log('in addToStock');
			return [...stocks, {
						abbr: action.abbr,
						daily: action.daily
					}]
		default:
			return  stocks;
	}
}

export default stockReducer