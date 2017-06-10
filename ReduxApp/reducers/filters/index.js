import { cities }							from './cities'

import { CHANGE_SALARY_REQUIRE_STATUS }		from '../../actions';
import { TOGGLE_CITY_SELECTION }			from '../../actions';
import { REQUEST_CITIES_LIST }				from '../../actions';
import { RESPONSE_CITIES_LIST }				from '../../actions';


export const filters = ( state, action ) => {
	switch ( action.type ) {
		case CHANGE_SALARY_REQUIRE_STATUS:
			return {
				...state,
				salaryIsRequired: !state.salaryIsRequired
			}
		case TOGGLE_CITY_SELECTION:
		case REQUEST_CITIES_LIST:
		case RESPONSE_CITIES_LIST:
			return {
				...state,
				cities: cities( state.cities, action )
			}

		default:
			return state
	}
}