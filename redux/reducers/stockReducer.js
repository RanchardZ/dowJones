

let stockReducer = function(stocks = [], action) {
	switch (action.type) {
		case 'ADD_TO_STOCK':
			return [{
						abbr: action.stock_data.meta.ticker,
						stock_data: action.stock_data.series
					}, ...stocks]
		default:
			return  stocks;
	}
}

export default stockReducer