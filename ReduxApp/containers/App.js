import	React								from 'react';
import	{Component}							from 'react';
import	PropTypes							from 'prop-types'
import	{ connect }							from 'react-redux'

import	Filters								from './Filters.jsx'

import	{ changeSalaryReq }					from '../actions'


class App extends Component {

	render() {
		return (
			<div>
				<Filters
					citiesList={this.props.citiesList}
					keyWordsList={this.props.keyWordsList}
					specializationsList={this.props.specializationsList}
					salaryIsRequired={this.props.salaryIsRequired}
					dispatch={this.props.dispatch}
				/>
			</div>
		)
	}
}

App.propTypes = {
	citiesList: PropTypes.array.isRequired,
	keyWordsList: PropTypes.array.isRequired,
	specializationsList: PropTypes.array.isRequired,
	salaryIsRequired: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		citiesList: state.filters.cities.list,
		keyWordsList: state.filters.keyWords.list,
		specializationsList: state.filters.specializations.list,
		salaryIsRequired: state.filters.salaryIsRequired
	}
}

export default connect(mapStateToProps)(App)