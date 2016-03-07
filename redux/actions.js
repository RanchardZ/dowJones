let actions = {
	addToStock: function(abbr, daily) {
		return {
			type: 'ADD_TO_STOCK',
			abbr: abbr,
			daily: daily
		}
	}
}

export default actions