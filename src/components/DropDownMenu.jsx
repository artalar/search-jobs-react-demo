import React								from 'react';
import { Component }						from 'react';
import MenuItem								from 'material-ui/MenuItem';
import PropTypes							from 'prop-types';
import TextField							from 'material-ui/TextField';
import Popover								from 'material-ui/Popover';	
import Menu									from 'material-ui/Menu';


export default class DropDownMenu extends Component {

	constructor() {
		super();
		this.state = {
			open: false,
			inputText: ''
		};
	}

	OnOpenPopover = event => {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			open: true,
			anchorEl: event.currentTarget
		});
	}

	onPopoverClose = () => {
		this.setState({
			open: false,
			inputText: ''
		});
		this.props.onSearch('');
	}

	onSearch = event => {
		this.setState({
			inputText: event.target.value
		});
		this.props.onSearch(event.target.value);
	}

	render() {
		const	items = this.props.itemsList,
				count = items.reduce(
					( acc, item ) => item.selectedStatus ? ++acc : acc
					, 0
				);
		return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
			<TextField
				hintText="Поиск..."
				floatingLabelText={`${this.props.label}, выбранно: ${count}`}
				value={this.state.inputText}
				onClick={this.OnOpenPopover}
				onChange={this.onSearch}
				// Disable Popover autofocus when opening
				onBlur={ event => this.state.open && event.target.focus() }
			/>
			<Popover
				open={this.state.open}
				anchorEl={this.state.anchorEl}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				onRequestClose={this.onPopoverClose}
				style={{minWidth: '350px'}}
			>
				<Menu maxHeight={600}>
					{
						!items.length
							? <MenuItem primaryText="Ничего не найдено" />
							: items.map( item => (
								<MenuItem
									key={item.id}
									primaryText={item.name}
									style={item.selectedStatus ? {color: "#00bdd5"} : {}}
									onTouchTap={() => this.props.onItemSelect(item)}
								/>
							))
					}
				</Menu>
			</Popover>
		</div>
		);
	}
};

DropDownMenu.propTypes = {
	label: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	itemsList: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		selectedStatus: PropTypes.bool,
	})).isRequired
};

DropDownMenu.defaultProps = {
	label: "Список",
	itemsList: [{
		name: "Ничего не найдено",
		id: 0,
		selectedStatus: false
	}],
	onItemSelect: () => {},
	onSearch: () => {}
};