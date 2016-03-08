let actions = {
	addToStock: function(abbr, daily) {
		return {
			type: 'ADD_TO_STOCK',
			abbr: abbr,
			daily: daily
		}
	},
	removeFromStock: function(abbr) {
		return {
			type: 'REMOVE_FROM_STOCK',
			abbr: abbr
		}
	}
}

export default actions