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
		let cur_state = this.state.inputStock;
		let stockUrl = `http://chartapi.finance.yahoo.com/instrument/1.0/${cur_state}/chartdata;type=quote;range=1y/json`
		
		$.ajax({
			url: stockUrl,
			type: 'GET',
			dataType: 'JSONP',
			success: function(data) {
				console.log(data);
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