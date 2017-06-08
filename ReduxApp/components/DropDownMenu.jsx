import	React								from 'react';
import	{ Component }						from 'react';
import	MenuItem							from 'material-ui/MenuItem';
import	PropTypes							from 'prop-types';
import	TextField							from 'material-ui/TextField';
import	Popover								from 'material-ui/Popover';	
import	Menu								from 'material-ui/Menu';


export default class DropDownMenu extends Component {

	constructor() {
		super();
		this.state = {
			open: false,
		};
	}

	OnOpenPopover = event => {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			open: true,
			anchorEl: event.currentTarget
		})
	};

	onPopoverClose = () => {
		this.setState({
			open: false,
		});
	};

	onSearch = event => {
		console.log(event.target.value)
	}

	render() {
		const	items = this.props.itemsList,
				count = items.reduce(
					(acc, item) => item.selectedStatus ? ++acc : acc
					, 0)

		return (
		<div>
			<TextField
				hintText="Поиск..."
				floatingLabelText={`${this.props.label} выбранно: ${count}`}
				onClick={this.OnOpenPopover}
				onChange={this.props.onSearch}
				// Disable Popover autofocus
				onBlur={event=>this.state.open && event.target.focus()}
			/>
			<Popover
				open={this.state.open}
				anchorEl={this.state.anchorEl}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				onRequestClose={this.onPopoverClose}
			>
				<Menu>
					{items.map((item) => (
						<MenuItem
							key={item.id}
							primaryText={item.name}
							style={item.selectedStatus ? {color: "#00bdd5"} : {}}
							onTouchTap={() => this.props.onItemSelect(item.id)}
						/>
					))}
				</Menu>
			</Popover>
		</div>
		);
	}
}

DropDownMenu.propTypes = {
	label: PropTypes.string.isRequired,
	itemsList: PropTypes.array.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired
};