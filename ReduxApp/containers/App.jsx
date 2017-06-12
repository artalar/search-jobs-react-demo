import React								from 'react';
import { Component }						from 'react';
import PropTypes							from 'prop-types';
import { connect }							from 'react-redux';

import Filters								from './Filters.jsx';
import VacancyList							from './VacancyList.jsx';

import { fetchVacanciesSearch }				from '../actions';


class App extends Component {

	remoteSearch = () => {
		const url = this.props.URL;
		this.props.dispatch( fetchVacanciesSearch(url) )
	};

	render() {
		return (
			<div style={{display: 'flex', justifyContent: 'space-around'}}>
				<Filters
					citiesList={this.props.citiesList}
					keyWordsList={this.props.keyWordsList}
					specializationsList={this.props.specializationsList}
					salaryIsRequired={this.props.salaryIsRequired}
					dispatch={this.props.dispatch}
				/>
				<VacancyList
					remoteSearch={this.remoteSearch}
					downloadedVacancies={this.props.downloadedVacancies}
					displayedVacancies={this.props.displayedVacancies}
					loading={this.props.loading}
					dispatch={this.props.dispatch}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		URL: state.URL,
		loading: state.loading,
		downloadedVacancies: state.downloadedVacancies,
		displayedVacancies: state.displayedVacancies,
		citiesList: state.filters.cities.list,
		keyWordsList: state.filters.keyWords.list,
		specializationsList: state.filters.specializations.list,
		salaryIsRequired: state.filters.salaryIsRequired
	}
}

export default connect(mapStateToProps)(App)