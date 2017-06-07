import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import CitySelector from './CitySelector.js';

export default class filtersContainer extends React.Component {

constructor(props) {
	super(props);
}

render() {
	return (
	<Toolbar>
		<ToolbarGroup >
		<ToolbarTitle text="Фильтры:" />
		</ToolbarGroup>
		<ToolbarGroup >
		<CitySelector
			citysSelectedList={this.props.citysSelectedList}
			updateCitysSelectedList={this.props.updateCitysSelectedList}

			citys={this.props.citys} citySearch={this.props.citySearch}
		/>
		<ToolbarSeparator />
		<Checkbox
			label="С указанием з.п."
			checked={this.props.salaryRequireStatus}
			onCheck={this.props.updateSalaryRequireStatus}
		/>
		</ToolbarGroup>
	</Toolbar>
	);
}
}