import { combineReducers } from 'redux';
import {
	CHANGE_SALARY_REQUIRE_STATUS,
	CHANGE_CITYS_SELECTED_LIST,
	LIKE_VACANCY, END_REMOTE_SEARCH,
	START_REMOTE_SEARCH,
	UPDATE_DISPLAYED_VACANCIES
} from '../actions';

const webRequest = (
	state = {
		URL: 'https://api.hh.ru/vacancies?specialization=1.221&per_page=50',
		SalaryIsRequired: true,
		citysSelectedList: [0,1,2]
	},
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
			citysSelectedList: action.value
		}
		default:
			return state;
	}
}

const likes = (state = {}, action) => {
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

const loadBar = (state=true, action) => {
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
	state = {
		loadVacancies: [],
		displayedVacancies: []
	},
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