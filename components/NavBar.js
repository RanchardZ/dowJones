import React, { Component } from 'react'
import SearchBar from './SearchBar'

class NavBar extends Component {

	render() {
		return (
			<div>
				<div>This is a navbar</div>
				<SearchBar/>
			</div>
		)
	}
}

export default NavBar