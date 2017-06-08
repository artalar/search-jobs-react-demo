import	React								from 'react';
import	{Component}							from 'react';
import	Checkbox							from 'material-ui/Checkbox';
import	{ Toolbar }							from 'material-ui/Toolbar';
import	{ ToolbarGroup }					from 'material-ui/Toolbar';
import	{ ToolbarSeparator }				from 'material-ui/Toolbar';
import	{ ToolbarTitle }					from 'material-ui/Toolbar';

import	DropDownMenu						from '../components/DropDownMenu.jsx';
import { selectCity } 						from '../actions'
import { requesteCitiesList } 				from '../actions'
import { responseCitiesList } 				from '../actions'


export default class HeaderToolBar extends Component {

	constructor(props) {
		super(props);
	}
	onSelectCity = id => {
		this.props.dispatch(selectCity(id))
	}
	citiesSearch = event => {
		const str = event.target.value;
		console.log(str);
		if(str.length < 2) return;
		this.props.dispatch(requesteCitiesList())
		fetch(`https://api.hh.ru/suggests/areas?text=${str}`)
			.then(resp => resp.json())
			.then(data => {
				if('errors' in data) throw data;
				const citiesList = data.items.map(city => {
					return {
						id: city.id,
						name: city.text,
						selectedStatus: false
					}
				} )
				this.props.dispatch(responseCitiesList(citiesList))
			}).catch(err => {
				console.error("Errors in ../containers/HeaderToolBar.jsx:requesteCitiesList", err)
			})
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
						label="Городов"
						itemsList={this.props.itemsList}
						onItemSelect={this.onSelectCity}
						onSearch={this.citiesSearch}
					/>
				</div>
				<ToolbarSeparator />
				<Checkbox />
			</ToolbarGroup>
		</Toolbar>);
	}
}