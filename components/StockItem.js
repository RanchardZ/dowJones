import React, { Component } from 'react'

class StockItem extends Component {

	render() {
		return (
			<div>
				<div> {this.props.stock.abbr} </div>

				{
					this.props.stock.daily.map((day) => {
						return (
							<li>
								{day.close} {day.high} {day.low} {day.open} {day.volume}
							</li>
						)
					})
				}
			</div>
		)
	}
}

export default StockItem