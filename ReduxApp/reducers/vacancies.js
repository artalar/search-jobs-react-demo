import { WEB_REQ_STATUS }					from '../constants';

import { UPDATE_DISPLAYED_VACANCIES }		from '../actions';
import { REQUEST_VACANCIES_SEARCH }			from '../actions';
import { RESPONSE_VACANCIES_SEARCH }		from '../actions';


export const vacancies = (state, action) => {
	switch (action.type) {
		case UPDATE_DISPLAYED_VACANCIES:
		return {
			...state,
			displayedVacancies: action.displayedVacancies
		}
		case REQUEST_VACANCIES_SEARCH:
		return {
			...state,
			loading: WEB_REQ_STATUS.IS_LOADING
		}
		case RESPONSE_VACANCIES_SEARCH:
		if ( action.response['errors'] ) return {
			...state,
			loading: WEB_REQ_STATUS.ERROR
		}
		return {
			...state,
			loading: WEB_REQ_STATUS.SUCCESS,
			downloadedVacancies: action.response.items,
			displayedVacancies: action.response.items
		}
		default:
		return state
	}
}