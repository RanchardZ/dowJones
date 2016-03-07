import React, { Component } from 'react'
import StockItem from './StockItem'

class StockBlock extends Component {

	render() {
		return (
			<ul>
				{
					this.props.stocks.map((stock) => {
						return <StockItem stock={stock} />
					})
				}
			</ul>
		)
	}
}

export default StockBlock