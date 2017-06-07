import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import CitySelector from './CitySelector.js';

export default class FiltersComponent extends React.Component {

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

FiltersComponent.propTypes = {
	salaryRequireStatus: React.PropTypes.bool.isRequired,
	salaryRequireStatusUpdater: React.PropTypes.func.isRequired,
	citiesList: React.PropTypes.array.isRequired,
	updateCitysSelectedList: React.PropTypes.func.isRequired
	
};