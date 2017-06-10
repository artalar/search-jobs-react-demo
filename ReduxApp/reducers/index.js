import { combineReducers }					from 'redux';

import { WEB_REQ_STATUS }					from '../constants';

import { filters }							from './filters'

import { CHANGE_SALARY_REQUIRE_STATUS }		from '../actions';
import { TOGGLE_CITY_SELECTION }			from '../actions';
import { REQUEST_CITIES_LIST }				from '../actions';
import { RESPONSE_CITIES_LIST }				from '../actions';


export const DefaultState = {
	URL: 'https://api.hh.ru/vacancies?',
	loadBar: true,
	localSearchQuere: '',
	vacanciesList: {
		loadVacancies: [],
		displayedVacancies: []
	},
	sortings: {},
	filters: {
		salaryIsRequired: true,
		cities: {
			URL: 'https://api.hh.ru/suggests/areas?text=',
			list: [
				{
					id: 1,
					name: "Москва",
					selectedStatus: false
				},
				{
					id: 2,
					name: "Санкт-Петербург",
					selectedStatus: false
				},
				{
					id: 43,
					name: "Калуга",
					selectedStatus: true
				},
			],
			reqStatus: WEB_REQ_STATUS.IS_LOADING
		}
	},
	likes: {},
}

const rootReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case CHANGE_SALARY_REQUIRE_STATUS:
		case TOGGLE_CITY_SELECTION:
		case REQUEST_CITIES_LIST:
		case RESPONSE_CITIES_LIST:
		return {
			...state,
			filters: filters( state.filters, action )
		}
	
		default:
			return state;
	}
}


export default rootReducer