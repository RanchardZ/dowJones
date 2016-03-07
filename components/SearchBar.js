import React, { Component } from 'react'

class SearchBar extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			inputStock: 'BABA'
		}
	}

	getStockInfo() {
		// get stock info with Yahoo api
		let inputStock = this.state.inputStock;

		// check if current stock is in state

		for (let i=0; i<this.props.stocks.length; i++) {
			if (this.props.stocks[i].abbr.toUpperCase() == inputStock.toUpperCase()) {
				console.log(this.props.stocks[i].abbr);
				return;
			}
		}


		let stockUrl = `http://chartapi.finance.yahoo.com/instrument/1.0/${inputStock}/chartdata;type=quote;range=1y/json`
		
		let abbr, daily;
		let act = this.props.actions.addToStock;
		
		$.ajax({
			url: stockUrl,
			type: 'GET',
			dataType: 'JSONP',
			success: function(data) {
				console.log(data.meta.ticker);
				console.log(data.series);
				act(data.meta.ticker, data.series);
			}
		});
	}

	handleChange(evt) {
		this.setState({
			inputStock: evt.target.value
		})
	}

	render() {
		return (
			<div>
				<input type="text" 
					   value={this.state.inputStock} 
					   placeholder="abbr of stock"
					   onChange={this.handleChange.bind(this)} />
				<button onClick={this.getStockInfo.bind(this)}> Search </button>
			</div>
		)
	}
}

export default SearchBar