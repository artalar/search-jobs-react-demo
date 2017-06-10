import	React								from 'react';
import	{Component}							from 'react';
import	PropTypes							from 'prop-types';
import	Checkbox							from 'material-ui/Checkbox';
import	{ Toolbar }							from 'material-ui/Toolbar';
import	{ ToolbarGroup }					from 'material-ui/Toolbar';
import	{ ToolbarSeparator }				from 'material-ui/Toolbar';
import	{ ToolbarTitle }					from 'material-ui/Toolbar';

import	DropDownMenu						from '../components/DropDownMenu.jsx';

import { selectCity }						from '../actions'
import { fetchCitiesList }					from '../actions'
import { changeSalaryReqStatus }			from '../actions'


export default class HeaderToolBar extends Component {

	constructor(props) {
		super(props);
	}

	onSelectCity = item => {
		this.props.dispatch( selectCity(item.id) )
	}

	onSearchCities = str => {
		this.props.dispatch( fetchCitiesList(str) )
	}

	onSalaryRequiredStatusChange = () => {
		this.props.dispatch( changeSalaryReqStatus() )
	}

	render() {
		return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text="С указанием з.п." />
				<Checkbox
					checked={this.props.salaryIsRequired}
					onCheck={this.onSalaryRequiredStatusChange}
				/>
			</ToolbarGroup>
			<ToolbarGroup >
				<DropDownMenu
					label="Города"
					itemsList={this.props.itemsList}
					onItemSelect={this.onSelectCity}
					onSearch={this.onSearchCities}
				/>
			</ToolbarGroup>
		</Toolbar>);
	}
}

HeaderToolBar.protoTypes = {
	itemsList: PropTypes.array.isRequired,
	salaryIsRequired: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}