import React								from 'react';
import { Component }						from 'react';
import PropTypes							from 'prop-types';
import { connect }							from 'react-redux';
import AppBar								from 'material-ui/AppBar';
import SearchField							from 'material-ui/TextField';
import IconButton							from 'material-ui/IconButton';
import FiltersIcon							from 'material-ui/svg-icons/action/search';

import Filters								from './Filters.jsx';
import VacancyList							from './VacancyList.jsx';

import { fetchVacanciesSearch }				from '../actions';


class App extends Component {

	state = {
		filtersOpen: true
	};

	changeFiltersOpenStatus = () => {
		this.setState({
			filtersOpen: !this.state.filtersOpen
		})
	}

	remoteSearch = () => {
		this.changeFiltersOpenStatus()
		this.props.dispatch( fetchVacanciesSearch() )
	};

	render() {
		return (
			<div style={{display: '', justifyContent: 'space-around'}}>
				<Filters
					remoteSearch={this.remoteSearch}
					citiesList={this.props.citiesList}
					keyWordsList={this.props.keyWordsList}
					specializationsList={this.props.specializationsList}
					salaryIsRequired={this.props.salaryIsRequired}
					isOpen={this.state.filtersOpen}
					changeOpenStatus={this.changeFiltersOpenStatus}
					dispatch={this.props.dispatch}
				/>
				<AppBar
					iconElementLeft={<IconButton><FiltersIcon /></IconButton>}
					onLeftIconButtonTouchTap={this.changeFiltersOpenStatus}
				/>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<VacancyList
						remoteSearch={this.remoteSearch}
						downloadedVacancies={this.props.downloadedVacancies}
						displayedVacancies={this.props.displayedVacancies}
						loading={this.props.loading}
						dispatch={this.props.dispatch}
					/>
				</div>
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