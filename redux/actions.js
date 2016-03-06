let actions = {
	addToStock: function(stock_data) {
		return {
			type: 'ADD_TO_STOCK',
			stock_data: stock_data
		}
	}
}

export default actions