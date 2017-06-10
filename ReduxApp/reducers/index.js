import { combineReducers }					from 'redux';

import { WEB_REQ_STATUS }					from '../constants';

import { filters }							from './filters'

import { CHANGE_SALARY_REQUIRE_STATUS }		from '../actions';
import { TOGGLE_CITY_SELECTION }			from '../actions';
import { REQUEST_CITIES_LIST }				from '../actions';
import { RESPONSE_CITIES_LIST }				from '../actions';
import { TOGGLE_KEY_WORD_SELECTION }		from '../actions';
import { REQUEST_KEY_WORDS_LIST }			from '../actions';
import { RESPONSE_KEY_WORDS_LIST }			from '../actions';


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
		keyWords: {
			URL: 'https://api.hh.ru/suggests/vacancy_search_keyword?text=',
			list: [	]
		},
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
		case TOGGLE_KEY_WORD_SELECTION:
		case REQUEST_KEY_WORDS_LIST:
		case RESPONSE_KEY_WORDS_LIST:

		return {
			...state,
			filters: filters( state.filters, action )
		}
	
		default:
			return state;
	}
}


export default rootReducer