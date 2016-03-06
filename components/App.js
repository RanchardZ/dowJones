import React, { Component } from 'react'
import StockBlock from './StockBlock'
import NavBar from './NavBar'

class App extends Component {

	render() {
		return (
			<div>
				<NavBar/>
				<StockBlock/>
			</div>
		)
	}
}

export default App