import	React								from 'react';
import	{Component}							from 'react';
import	PropTypes							from 'prop-types';
import	Drawer								from 'material-ui/Drawer';
import	AppBar								from 'material-ui/AppBar';
import	IconButton							from 'material-ui/IconButton';
//./node_modules/material-ui/svg-icons
import	AcceptFilters						from 'material-ui/svg-icons/action/search';
import	ClearFilters						from 'material-ui/svg-icons/navigation/close';
import	FlatButton							from 'material-ui/FlatButton';
import	Checkbox							from 'material-ui/Checkbox';

import	DropDownMenu						from '../components/DropDownMenu.jsx';

import { changeSalaryReqStatus }			from '../actions'
import { selectCity }						from '../actions'
import { fetchCitiesList }					from '../actions'
import { selectKeyWord }					from '../actions/filters/keyWords'
import { fetchKeyWordsList }				from '../actions/filters/keyWords'


export default class Filters extends Component {

	constructor(props) {
		super(props);
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

	onSalaryRequiredStatusChange = () => {
		this.props.dispatch( changeSalaryReqStatus() )
	}

	render() {
		return (
		<Drawer>
			<AppBar
				title="Фильтры"
				iconElementLeft={<IconButton><ClearFilters /></IconButton>}
				iconElementRight={<IconButton><AcceptFilters /></IconButton>}
			/>
			<div className='filters'>
				<br/>
				<FlatButton
					label={this.props.salaryIsRequired ? 'Только с указанием з.п.' : 'Без указания з.п.'}
					onTouchTap={this.onSalaryRequiredStatusChange}
					fullWidth={true} 
				/>
				<DropDownMenu
					label="Ключевые слова"
					itemsList={this.props.keyWordsList}
					onItemSelect={this.onSelectKeyWord}
					onSearch={this.onSearchKeyWords}
				/>
				<DropDownMenu
					label="Города"
					itemsList={this.props.citiesList}
					onItemSelect={this.onSelectCity}
					onSearch={this.onSearchCities}
				/>
			</div>
		</Drawer>);
	}
}

Filters.protoTypes = {
	citiesList: PropTypes.array.isRequired,
	keyWordsList: PropTypes.array.isRequired,
	salaryIsRequired: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}