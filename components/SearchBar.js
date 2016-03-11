import React, { Component } from 'react'

class SearchBar extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			inputStock: 'BABA'
		}
	}

	getStockInfo() {
		const inputStock = this.state.inputStock;

		// check if current stock is in state
		for (let i=0; i<this.props.stocks.length; i++) {
			if (this.props.stocks[i].abbr.toUpperCase() == inputStock.toUpperCase()) {
				return;
			}
		}

		// check if current stock is in database
		let isInDataBase = false;
		let addToStock = this.props.actions.addToStock;
		$.ajax({
			type: "GET",
			url: `http://222.29.193.165:5010/api/stocks/${inputStock.toLowerCase()}`,
			dataType: 'JSON',
			success: function(data) {
				if (data.length === 0) {
					console.log("current stock is not in database");
					// get stock data from yahoo finance api
					const stockUrl = `http://chartapi.finance.yahoo.com/instrument/1.0/${inputStock}/chartdata;type=quote;range=1y/json`		
					$.ajax({
						url: stockUrl,
						type: 'GET',
						dataType: 'JSONP',
						success: function(data) {

							const abbr = data.meta.ticker;
							const daily = data.series;
							addToStock(abbr, daily);

							const stock = JSON.stringify({abbr: abbr, daily: daily});
							$.ajax({
								type: "PUT",
								url: `http://localhost:5010/api/stocks/${inputStock.toLowerCase()}`,
								data: stock,
								contentType: "application/json; charset=utf-8",
								success: function(result) {
									console.log('send data to server api');
								}
							})

						}
					});
				} else {
					let daily = [];
					const abbr = data[0].abbr;
					for (let i=0; i<data.length; i++) {
						daily.push({
							Date: data[i].date,
							volume: data[i].volume,
							open: data[i].open,
							high: data[i].high,
							low: data[i].low,
							close: data[i].close,
						})
					}
					addToStock(abbr, daily);
					isInDataBase = true;
				}
			}
		})

		// get news data from nytimes api
		const nytimesUrl = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${inputStock}&sort=newest&api-key=89abc25b3738f03f8f4d0db2573f5479:3:74645363`
		const selector = '#' + inputStock.toLowerCase();
		console.log(selector);
		$.getJSON(nytimesUrl, function(data){
			$(selector).text(`New York Times Articles About ${inputStock}`);
			const articles = data.response.docs;
			for (let i=0; i<3; i++) {
				const article = articles[i];
				$(selector).append(`<li class="left-align"><a href="${article.web_url}">${article.headline.main}</a> + <p>${article.snippet}</p></li>`);
			};
		})
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
