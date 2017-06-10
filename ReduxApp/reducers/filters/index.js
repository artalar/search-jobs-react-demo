import { cities }							from './cities'
import { keyWords }							from './keyWords'

import { CHANGE_SALARY_REQUIRE_STATUS }		from '../../actions';
import { TOGGLE_CITY_SELECTION }			from '../../actions';
import { REQUEST_CITIES_LIST }				from '../../actions';
import { RESPONSE_CITIES_LIST }				from '../../actions';
import { TOGGLE_KEY_WORD_SELECTION }		from '../../actions';
import { REQUEST_KEY_WORDS_LIST }			from '../../actions';
import { RESPONSE_KEY_WORDS_LIST }			from '../../actions';


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
		case TOGGLE_KEY_WORD_SELECTION:
		case REQUEST_KEY_WORDS_LIST:
		case RESPONSE_KEY_WORDS_LIST:
			return {
				...state,
				keyWords: keyWords( state.keyWords, action )
			}
		default:
			return state
	}
}