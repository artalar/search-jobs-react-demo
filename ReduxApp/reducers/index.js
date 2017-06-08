import { combineReducers }					from 'redux';

import { WEB_REQ_STATUS }					from '../constants';
import { CHANGE_SALARY_REQUIRE_STATUS }		from '../actions';
import { CHANGE_CITYS_SELECTED_LIST }		from '../actions';
import { LIKE_VACANCY }						from '../actions';
import { END_REMOTE_SEARCH }				from '../actions';
import { START_REMOTE_SEARCH }				from '../actions';
import { UPDATE_DISPLAYED_VACANCIES }		from '../actions';
import { RESPONSE_CITIES_LIST }				from '../actions';


const DefState = {
	webRequest: {
		URL: 'https://api.hh.ru/vacancies?specialization=1.221&per_page=50',
		SalaryIsRequired: true,
		citiesList: [
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
		]
	},
	likes: {},
	loadBar: true,
	vacanciesList: {
		loadVacancies: [],
		displayedVacancies: []
	}
}

//new architecture
export const DefaultState = {
	filters: {
		cities: {
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
	}
}

const webRequest = (
	state = DefState.webRequest,
	action
) => {
	switch (action.type) {

		case CHANGE_SALARY_REQUIRE_STATUS:
		return {
			...state,
			SalaryIsRequired: !state.SalaryIsRequired
		}
		case CHANGE_CITYS_SELECTED_LIST:
		return {
			...state,
			citiesList: state.citiesList.map((item) => {
				return item.id !== action.selectCityId
					? item
					: {
						...item,
						selectedStatus: !item.selectedStatus
					}
			})
		}
		case RESPONSE_CITIES_LIST:
		return {
			...state,
			citiesList: [...action.list]
		}
		default:
			return state;
	}
}

const likes = (state = DefState.likes, action) => {
	switch (action.type) {
		case LIKE_VACANCY:
			return {
				...state,
				[action.vacancyAddress]: action.likeStatus
			}
		default:
			return state;
	}
}

const loadBar = (state=DefState.loadBar, action) => {
	switch (action.type) {
		case START_REMOTE_SEARCH:
			return true;
		case END_REMOTE_SEARCH:
			return false;
		default:
			return state;
	}
}
const vacanciesList = (
	state = DefState.vacanciesList,
	action
) => {
	switch (action.type) {
		case END_REMOTE_SEARCH:
			return {
				loadVacancies: action.loadVacancies,
				displayedVacancies: action.loadVacancies
			}
		case UPDATE_DISPLAYED_VACANCIES:
			return {
				...state,
				displayedVacancies: action.displayedVacancies
			}
		default:
			return state;
	}
}


const rootReducer = combineReducers({
	webRequest,
	likes,
	loadBar,
	vacanciesList
})

export default rootReducer