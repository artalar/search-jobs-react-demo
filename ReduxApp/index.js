import React								from 'react';
import { Component }						from 'react';
import { render }							from 'react-dom'
import { createStore }						from 'redux'
import { compose }							from 'redux'
import { applyMiddleware }					from 'redux'
import { Provider }							from 'react-redux'
import thunk								from 'redux-thunk'
import { createLogger }						from 'redux-logger'
import MuiThemeProvider						from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin					from 'react-tap-event-plugin';

import reducer								from './reducers'
import App									from './containers/App.jsx'


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)
  ));

export default class root extends React.Component {
	render () {
		return (
			<MuiThemeProvider>
				<Provider store={store}>
					<App/>
				</Provider>
			</MuiThemeProvider>
		)
	}
}