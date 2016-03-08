import React, { Component } from 'react'

class StockItem extends Component {

	showCandleStick(delta) {
		// console.log(this.props.stock.daily.length);
		let cas_points 	= [];
		let vol_points 	= [];
		let highs 		= [];
		let volumes 	= [];
		for (let i=0; i<this.props.stock.daily.length; i++) {
			highs.push(this.props.stock.daily[i].high);
			volumes.push(this.props.stock.daily[i].volume);
			if ((i+1) % delta === 0) {
				let date = this.props.stock.daily[i].Date;
				let year = Math.floor(date / 10000);
				let month = Math.floor(date % 10000 / 100);
				let day = Math.floor(date % 100);
				// console.log(month, day);
				let cas_point = {
					x: new Date(year, month, day),
					y: [this.props.stock.daily[i].open,
						this.props.stock.daily[i].high,
						this.props.stock.daily[i].low,
						this.props.stock.daily[i].close,]
				}
				let vol_point = {
					x: new Date(year, month, day),
					y: this.props.stock.daily[i].volume,
					z: this.props.stock.daily[i].volume
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

		let chart = new CanvasJS.Chart(this.props.stock.abbr,
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

	testScript() {
		console.log('hello');
		selector = '#' + this.props.stock.abbr;
		console.log(selector);
		return "Hello"
	}

	render() {
		let rect = {height: '300px', width: '1000px'};
		let bt = {width: '200px'}
		let cad = {height: '300px'}
		return (
			<div className="row">
				<div className="col s4 l3 right-align">
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
				<div className="col s8 l9 card white" id={this.props.stock.abbr} style={rect}></div>				
			</div>
		)
	}
}

export default StockItem