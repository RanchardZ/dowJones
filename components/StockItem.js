import React, { Component } from 'react'

class StockItem extends Component {

	showCandleStick() {
		// console.log(this.props.stock.daily.length);
		var points = [];
		for (var i=0; i<this.props.stock.daily.length; i++) {
			let date = this.props.stock.daily[i].Date;
			let year = Math.floor(date / 10000);
			let month = Math.floor(date % 10000 / 100);
			let day = Math.floor(date % 100);
			// console.log(month, day);
			let coord = {
				x: new Date(year, month, day),
				y: [this.props.stock.daily[i].open,
					this.props.stock.daily[i].high,
					this.props.stock.daily[i].low,
					this.props.stock.daily[i].close,]
			}
			points.push(coord);
		}

		var chart = new CanvasJS.Chart(this.props.stock.abbr,
		{
			title:{
				text: `Stock Prices of ${this.props.stock.abbr.toUpperCase()} in the Last Year`,
			},
			exportEnabled: true,
			axisY: {
				includeZero:false,
				prefix: "$",
				title: "Prices",
			},     
			axisX: {
				interval:1,
				valueFormatString: "MMM-DD",
			},
			toolTip: {
				content: "Date:{x}</br><strong>Prices:</strong></br>Open:{y[0]}, Close:{y[3]}</br>High:{y[1]},Low:{y[2]}",
			},
			data: [
			{
				type: "candlestick",
				dataPoints: points
			}
			]
		});
		chart.render();
	}

	render() {
		return (
			<div>
				<div> {this.props.stock.abbr} </div>
				<button onClick={this.showCandleStick.bind(this)} > Show CandleStick </button>
				<div class="candleStick" id={this.props.stock.abbr}></div>				
			</div>
		)
	}
}

export default StockItem