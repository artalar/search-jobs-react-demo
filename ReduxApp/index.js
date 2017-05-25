import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)
  ));

console.log(store.getState())

export default class root extends React.Component {
	render () {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}