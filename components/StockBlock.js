import React, { Component } from 'react'
import StockItem from './StockItem'

class StockBlock extends Component {

	render() {
		return (
			<div>
				<ul>
					{
						this.props.stocks.map((stock) => {
							return <li><StockItem stock={stock} removeFromStock={this.props.removeFromStock}/></li>
						})
					}
				</ul>
			</div>
		)
	}
}

export default StockBlock