import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const citys = [
  {value: 0, name: 'Москва'},
  {value: 1, name: 'Санкт-Петербург'},
  {value: 2, name: 'Калуга'},
];

export default class CitySelector extends Component {
  constructor(props) {
    super(props);
  };

  selectionRenderer = (values) => {
    
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return citys[values[0]].name;
      default:
        return `Выбрано ${values.length} города`;
    }
  }

  menuItems(citys) {
    return citys.map((city) => (
      <MenuItem
        key={city.value}
        insetChildren={true}
        checked={this.props.citysSelectedList.includes(city.value)}
        value={city.value}
        primaryText={city.name}
      />
    ));
  }

  render() {
    return (
      <SelectField
        multiple={true}
        hintText="Выбор города"
        value={this.props.citysSelectedList}
        onChange={this.props.updateCitysSelectedList}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(citys)}
      </SelectField>
    );
  }
}