import React, { Component } from 'react'
import StockBlock from './StockBlock'
import NavBar from './NavBar'

// react redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'

class App extends Component {

	render() {
		return (
			<div>
				<NavBar actions={this.props.actions} stocks={this.props.stocks}/>
				<StockBlock className="container" stocks={this.props.stocks} removeFromStock={this.props.actions.removeFromStock}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)