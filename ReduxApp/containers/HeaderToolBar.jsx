import	React								from 'react';
import	{Component}							from 'react';
import	Checkbox							from 'material-ui/Checkbox';
import	{ Toolbar }							from 'material-ui/Toolbar';
import	{ ToolbarGroup }					from 'material-ui/Toolbar';
import	{ ToolbarSeparator }				from 'material-ui/Toolbar';
import	{ ToolbarTitle }					from 'material-ui/Toolbar';

import	DropDownMenu						from '../components/DropDownMenu.jsx';
import { selectCity } 						from '../actions'


export default class HeaderToolBar extends Component {

	constructor(props) {
		super(props);
	}
	onSelectCity = id => {
		this.props.dispatch(selectCity(id))
	}
	sitiesSearch = event => {
		console.log(event.target.value)
	}
	render() {
		return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text="Фильтры:" />
			</ToolbarGroup>
			<ToolbarGroup >
				<div style={{margin: "0% 0% 5%"}}>
					<DropDownMenu
						label="Городов выбранно"
						itemsList={this.props.itemsList}
						onItemSelect={this.onSelectCity}
						onSearch={this.sitiesSearch}
					/>
				</div>
				<ToolbarSeparator />
				<Checkbox />
			</ToolbarGroup>
		</Toolbar>);
	}
}