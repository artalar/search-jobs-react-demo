import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SitySelector from './SitySelector.js';

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.salaryStatusUpdate.bind(this);
    this.state = {
      salaryStatus: this.props.salary.status,
    };
  }

  salaryStatusUpdate = (event, index, value) => {
    this.setState({salaryStatus: value});
    this.props.salary.update(value, '&only_with_salary')
  }
  render() {
    return (
      <Toolbar>
        <ToolbarGroup >
          <ToolbarTitle text="Фильтры:" />
        </ToolbarGroup>
        <ToolbarGroup >
          <SitySelector sitys={this.props.sitys} sitySearch={this.props.sitySearch}/>
          <ToolbarSeparator />
          <Checkbox label="С указанием з.п." checked={this.state.salaryStatus} onCheck={this.salaryStatusUpdate}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}