import Checkbox from 'material-ui/Checkbox';

<Checkbox
	label="С указанием з.п."
	checked={this.props.salaryRequireStatus}
	onCheck={this.props.updateSalaryRequireStatus}
/>