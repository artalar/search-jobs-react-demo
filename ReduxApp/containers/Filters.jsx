import React								from 'react';
import {Component}							from 'react';
import PropTypes							from 'prop-types';
import Drawer								from 'material-ui/Drawer';
import AppBar								from 'material-ui/AppBar';
import IconButton							from 'material-ui/IconButton';
import AcceptFilters						from 'material-ui/svg-icons/action/search';
import ClearFilters							from 'material-ui/svg-icons/navigation/close';
import FlatButton							from 'material-ui/FlatButton';
import Checkbox								from 'material-ui/Checkbox';

import DropDownMenu							from '../components/DropDownMenu.jsx';

import { changeSalaryReqStatus }			from '../actions/filters';
import { cleanAllFilters }					from '../actions/filters';
import { selectCity }						from '../actions/filters/cities';
import { fetchCitiesList }					from '../actions/filters/cities';
import { selectKeyWord }					from '../actions/filters/keyWords';
import { fetchKeyWordsList }				from '../actions/filters/keyWords';
import { selectSpecialization }				from '../actions/filters/specializations';
import { fetchSpecializationsList }			from '../actions/filters/specializations';


export default class Filters extends Component {

	constructor(props) {
		super(props);
	}

	onRemoveAllFilters = () => {
		this.props.dispatch( cleanAllFilters() )
	}

	onSelectCity = item => {
		this.props.dispatch( selectCity(item.id) )
	}

	onSearchCities = str => {
		this.props.dispatch( fetchCitiesList(str) )
	}

	onSelectKeyWord = item => {
		this.props.dispatch( selectKeyWord(item.id) )
	}

	onSearchKeyWords = str => {
		this.props.dispatch( fetchKeyWordsList(str) )
	}

	onSelectSpecialization = item => {
		this.props.dispatch( selectSpecialization(item.id) )
	}

	onSearchSpecializations = str => {
		this.props.dispatch( fetchSpecializationsList(str) )
	}

	onSalaryRequiredStatusChange = () => {
		this.props.dispatch( changeSalaryReqStatus() )
	}

	render() {
		return (
		<Drawer width='20%'>
			<AppBar
				title="Фильтры"
				iconElementLeft={<IconButton><ClearFilters /></IconButton>}
				iconElementRight={<IconButton><AcceptFilters /></IconButton>}
				onLeftIconButtonTouchTap={this.onRemoveAllFilters}
				onRightIconButtonTouchTap={this.props.remoteSearch}
			/>
			<div className='filters'>
				<br/>
				<FlatButton
					label={this.props.salaryIsRequired ? 'Только с указанием з.п.' : 'Без указания з.п.'}
					onTouchTap={this.onSalaryRequiredStatusChange}
					fullWidth={true} 
				/>
				<DropDownMenu
					label="Города"
					itemsList={this.props.citiesList}
					onItemSelect={this.onSelectCity}
					onSearch={this.onSearchCities}
				/>
				<DropDownMenu
					label="Ключевые слова"
					itemsList={this.props.keyWordsList}
					onItemSelect={this.onSelectKeyWord}
					onSearch={this.onSearchKeyWords}
				/>
				<DropDownMenu
					label="Специализация"
					itemsList={this.props.specializationsList}
					onItemSelect={this.onSelectSpecialization}
					onSearch={this.onSearchSpecializations}
				/>
			</div>
		</Drawer>);
	}
}

Filters.protoTypes = {
	remoteSearch: PropTypes.func.isRequired,
	citiesList: PropTypes.array.isRequired,
	keyWordsList: PropTypes.array.isRequired,
	specializationsList: PropTypes.array.isRequired,
	salaryIsRequired: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}