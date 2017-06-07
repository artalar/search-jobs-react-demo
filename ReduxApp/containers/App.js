import	React								from 'react';
import	{Component}							from 'react';
import PropTypes							from 'prop-types'
import { connect }							from 'react-redux'

import { changeSalaryReq }					from '../actions'
import HeaderToolBar						from '../containers/HeaderToolBar.jsx'


class App extends Component {

	render() {
		return (
			<div>
				<HeaderToolBar
					itemsList={this.props.itemsList}
					dispatch={this.props.dispatch}
				/>
			</div>
		)
	}
}

App.propTypes = {
	URL: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired,

}

const mapStateToProps = state => {
	const { webRequest } = state;
	const URL = `${webRequest.URL}&${webRequest.SalaryIsRequired}`;
	const itemsList = webRequest.citiesList;
	const value = webRequest.value;

	return {
		URL,
		itemsList,
		value
	}
}

/*const mapDispatchToProps = (dispatch) => {
return {
	onTodoClick: (id) => {
	dispatch(toggleTodo(id))
	}
}*/

export default connect(mapStateToProps)(App)