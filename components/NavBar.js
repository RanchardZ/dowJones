import React, { Component } from 'react'
import SearchBar from './SearchBar'

class NavBar extends Component {

	render() {
		return (
			<div>
				<nav roll="navigation" className="teal">
					<span className="brand-logo center"> Dow Jones in one click </span>
					<SearchBar actions={this.props.actions} stocks={this.props.stocks}/>
				</nav>
			</div>
		)
	}
}

export default NavBar