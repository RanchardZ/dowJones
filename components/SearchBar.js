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
		const inputStock = this.state.inputStock;

		// check if current stock is in state

		for (let i=0; i<this.props.stocks.length; i++) {
			if (this.props.stocks[i].abbr.toUpperCase() == inputStock.toUpperCase()) {
				console.log(this.props.stocks[i].abbr);
				return;
			}
		}

		// get stock data from yahoo finance api
		const stockUrl = `http://chartapi.finance.yahoo.com/instrument/1.0/${inputStock}/chartdata;type=quote;range=1y/json`
		
		let act = this.props.actions.addToStock;
		
		$.ajax({
			url: stockUrl,
			type: 'GET',
			dataType: 'JSONP',
			success: function(data) {

				const abbr = data.meta.ticker;
				const daily = data.series;
				const stock = JSON.stringify({abbr: abbr, daily: daily});
				$.ajax({
					type: "POST",
					url: "/",
					data: stock,
					contentType: "application/json; charset=utf-8",
					success: function(result) {
						console.log('successful');
					}
				})

			}
		});

		// get news data from nytimes api
		// const nytimesUrl = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${inputStock}&sort=newest&api-key=89abc25b3738f03f8f4d0db2573f5479:3:74645363`
		// const selector = '#' + inputStock.toLowerCase();
		// console.log(selector);
		// $.getJSON(nytimesUrl, function(data){
		// 	$(selector).text(`New York Times Articles About ${inputStock}`);
		// 	const articles = data.response.docs;
		// 	for (let i=0; i<3; i++) {
		// 		const article = articles[i];
		// 		$(selector).append(`<li class="left-align"><a href="${article.web_url}">${article.headline.main}</a> + <p>${article.snippet}</p></li>`);
		// 	};
		// })
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.getStockInfo();
	}

	handleChange(evt) {
		this.setState({
			inputStock: evt.target.value
		})
	}

	// render() {
	// 	return (
	// 		<form action="/" method="post" id="stockForm">
	// 			<div className="input-field align-left">
	// 				<input id="search" type="search" name="stockQuery" value={this.state.inputStock} placeholder="abbr of stock" onChange={this.handleChange.bind(this)} required />
	// 				<i className="material-icons" id="searchIcon">search</i>
	// 			</div>
	// 		</form>
	// 	)
	// }
	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<div className="input-field align-left">
					<input id="search" type="search" value={this.state.inputStock} placeholder="abbr of stock" onChange={this.handleChange.bind(this)} required />
					<i className="material-icons" onClick={this.getStockInfo.bind(this)}>search</i>
				</div>
			</form>
		)
	}
}

export default SearchBar