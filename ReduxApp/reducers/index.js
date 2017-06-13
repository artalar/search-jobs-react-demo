import { combineReducers }					from 'redux';

import { WEB_REQ_STATUS }					from '../constants';

import { vacancies }						from './vacancies'
import { filters }							from './filters'

import { UPDATE_DISPLAYED_VACANCIES }		from '../actions';
import { REQUEST_VACANCIES_SEARCH }			from '../actions';
import { RESPONSE_VACANCIES_SEARCH }		from '../actions';
import { CLEAN_ALL_FILTERS }				from '../actions/filters';
import { CHANGE_SALARY_REQUIRE_STATUS }		from '../actions/filters';
import { TOGGLE_CITY_SELECTION }			from '../actions/filters/cities';
import { REQUEST_CITIES_LIST }				from '../actions/filters/cities';
import { RESPONSE_CITIES_LIST }				from '../actions/filters/cities';
import { TOGGLE_KEY_WORD_SELECTION }		from '../actions/filters/keyWords';
import { REQUEST_KEY_WORDS_LIST }			from '../actions/filters/keyWords';
import { RESPONSE_KEY_WORDS_LIST }			from '../actions/filters/keyWords';
import { TOGGLE_SPECIALIZATION_SELECTION }	from '../actions/filters/specializations';
import { REQUEST_SPECIALIZATIONS_LIST }		from '../actions/filters/specializations';
import { RESPONSE_SPECIALIZATIONS_LIST }	from '../actions/filters/specializations';


export const DefaultState = {
	URL: 'https://api.hh.ru/vacancies?',
	loading: WEB_REQ_STATUS.IS_LOADING,
	localSearchQuere: '',
	downloadedVacancies: [],
	displayedVacancies: [],
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
		},
		keyWords: {
			URL: 'https://api.hh.ru/suggests/vacancy_search_keyword?text=',
			list: [	]
		},
		specializations: {
			URL: 'https://api.hh.ru/suggests/fields_of_study?text=',
			list: [	]
		},
	},
	likes: {},
}

const rootReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case CLEAN_ALL_FILTERS:
		case CHANGE_SALARY_REQUIRE_STATUS:

		case TOGGLE_CITY_SELECTION:
		case REQUEST_CITIES_LIST:
		case RESPONSE_CITIES_LIST:

		case TOGGLE_KEY_WORD_SELECTION:
		case REQUEST_KEY_WORDS_LIST:
		case RESPONSE_KEY_WORDS_LIST:

		case TOGGLE_SPECIALIZATION_SELECTION:
		case REQUEST_SPECIALIZATIONS_LIST:
		case RESPONSE_SPECIALIZATIONS_LIST:

		return {
			...state,
			filters: filters( state.filters, action )
		}
		
		case UPDATE_DISPLAYED_VACANCIES:
		case REQUEST_VACANCIES_SEARCH:
		case RESPONSE_VACANCIES_SEARCH:
		return vacancies( state, action )

		default:
		return state;
	}
}


export default rootReducer