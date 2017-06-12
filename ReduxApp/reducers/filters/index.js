import { cities }							from './cities'
import { keyWords }							from './keyWords'
import { specializations }					from './specializations'

import { CHANGE_SALARY_REQUIRE_STATUS }		from '../../actions/filters';
import { TOGGLE_CITY_SELECTION }			from '../../actions/filters/cities';
import { REQUEST_CITIES_LIST }				from '../../actions/filters/cities';
import { RESPONSE_CITIES_LIST }				from '../../actions/filters/cities';
import { TOGGLE_KEY_WORD_SELECTION }		from '../../actions/filters/keyWords';
import { REQUEST_KEY_WORDS_LIST }			from '../../actions/filters/keyWords';
import { RESPONSE_KEY_WORDS_LIST }			from '../../actions/filters/keyWords';
import { TOGGLE_SPECIALIZATION_SELECTION }	from '../../actions/filters/specializations';
import { REQUEST_SPECIALIZATIONS_LIST }		from '../../actions/filters/specializations';
import { RESPONSE_SPECIALIZATIONS_LIST }	from '../../actions/filters/specializations';


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
		case TOGGLE_SPECIALIZATION_SELECTION:
		case REQUEST_SPECIALIZATIONS_LIST:
		case RESPONSE_SPECIALIZATIONS_LIST:
			return {
				...state,
				specializations: specializations( state.specializations, action )
			}
		default:
			return state
	}
}