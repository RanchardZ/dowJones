import React, { Component } from 'react'
import _ from 'lodash'

class StockItem extends Component {

	showCandleStick(delta) {
		// console.log(this.props.stock.daily.length);
		let cas_points 	= [];
		let vol_points 	= [];

		const {stock: {abbr, daily}} = this.props;

		const highs = _.map(daily, 'high');
		const volumes = _.map(daily, 'volume');
		// let highs 		= [];
		// let volumes 	= [];
		for (let i=0; i<daily.length; i++) {
			// highs.push(this.props.stock.daily[i].high);
			// volumes.push(this.props.stock.daily[i].volume);
			if ((i+1) % delta === 0) {
				const date = daily[i].Date;
				const year = Math.floor(date / 10000);
				const month = Math.floor(date % 10000 / 100);
				const day = Math.floor(date % 100);
				// console.log(month, day);
				const cas_point = {
					x: new Date(year, month, day),
					y: [daily[i].open,
						daily[i].high,
						daily[i].low,
						daily[i].close,]
				}
				const vol_point = {
					x: new Date(year, month, day),
					y: daily[i].volume,
					z: daily[i].volume
				}
				cas_points.push(cas_point);
				vol_points.push(vol_point);
			}
		}
		const max_high 	= Math.max.apply(Math, highs);
		const max_vol 	= Math.max.apply(Math, volumes);
		for (let i=0; i<vol_points.length; i++) {
			vol_points[i].y = vol_points[i].y / max_vol * max_high * 1.5;
		}

		const chart = new CanvasJS.Chart(abbr,
		{
			title:{
				text: `Stock Prices of ${abbr.toUpperCase()} in the Last Year`,
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
				content: "Date:{x}</br><strong>Prices:</strong></br>Open:{y[0]}, Close:{y[3]}</br>High:{y[1]},Low:{y[2]}</br>Volume:{z}",
			},
			data: [
			{
				type: "candlestick",
				dataPoints: cas_points
			},
			{
				type: "area",
				dataPoints: vol_points
			}
			]
		});
		chart.render();
	}

	removeStock() {
		this.props.removeFromStock(this.props.stock.abbr);
	}

	render() {
		const rect = {height: '300px', width: '1000px'};
		const bt = {width: '200px'}
		const cad = {height: '300px'}
		return (
			<div className="row">
				<div className="col s4 m4 l3 right-align">
					<div className="card teal" style={cad}>
					<ul className="center">
					<li><div className="chip">{this.props.stock.abbr.toUpperCase()}</div></li><br/>
					<li><div className="btn" onClick={this.showCandleStick.bind(this, 1)} style={bt}>One Day</div></li><br/>
					<li><div className="btn" onClick={this.showCandleStick.bind(this, 5)} style={bt}>Five Day</div></li><br/>
					<li><div className="btn" onClick={this.showCandleStick.bind(this, 30)} style={bt}>one Month</div></li><br/>
					<li><div className="btn teal darken-2" onClick={this.removeStock.bind(this)} style={bt}>Remove</div></li>
					<br/>
					</ul>
					</div>
				</div>
				<div className="col s8 m8 l9 card white" id={this.props.stock.abbr} style={rect}></div>				
			</div>
		)
	}
}

export default StockItem