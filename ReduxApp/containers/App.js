import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeSalaryReq } from '../actions'

class App extends Component {
	static propTypes = {
		URL: PropTypes.string.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	constructor (data) {
		super(data);
		this.btn = this.btn.bind(this);
	}

	btn() {
		this.props.dispatch(changeSalaryReq())
	}

	render() {
		return (
			<div>
				<button onClick={this.btn}>
					btn
				</button>
				<br/><br/>
				{this.props.URL}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { webRequest } = state;
	const URL = `${webRequest.URL}&${webRequest.SalaryIsRequired}`

	return {
		URL
	}
}

export default connect(mapStateToProps)(App)