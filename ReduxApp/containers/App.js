import	React								from 'react';
import	{Component}							from 'react';
import PropTypes							from 'prop-types'
import { connect }							from 'react-redux'

import { changeSalaryReq }					from '../actions'
import HeaderToolBar						from '../containers/HeaderToolBar.jsx'


class App extends Component {

	render() {
		return (
			<div>
				<HeaderToolBar
					itemsList={this.props.itemsList}
					salaryIsRequired={this.props.salaryIsRequired}
					dispatch={this.props.dispatch}
				/>
			</div>
		)
	}
}

App.propTypes = {
	itemsList: PropTypes.array.isRequired,
	salaryIsRequired: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		itemsList: state.filters.cities.list,
		salaryIsRequired: state.filters.salaryIsRequired
	}
}

export default connect(mapStateToProps)(App)