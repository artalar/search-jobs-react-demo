import { getUnicItems }						from '../../utils/reducers/filters'

import { WEB_REQ_STATUS }					from '../../constants';

import { TOGGLE_CITY_SELECTION }			from '../../actions/filters/cities';
import { REQUEST_CITIES_LIST }				from '../../actions/filters/cities';
import { RESPONSE_CITIES_LIST }				from '../../actions/filters/cities';


export const cities = ( state, action ) => {
	switch ( action.type ) {

		case TOGGLE_CITY_SELECTION:
		return {
			...state,
			list: state.list.map( city => {
				return city.id !== action.selectedCityId
					? city
					: {
						...city,
						selectedStatus: !city.selectedStatus
					}
			})
		}
		case REQUEST_CITIES_LIST:
		return {
			...state,
			reqStatus: WEB_REQ_STATUS.IS_LOADING
		}
		case RESPONSE_CITIES_LIST:
		if ( action.response['errors'] ) return {
			...state,
			list: getUnicItems( state.list, [] ),
			reqStatus: WEB_REQ_STATUS.ERROR
		}
		return {
			...state,
			list: getUnicItems( state.list, action.response.items || []),
			reqStatus: WEB_REQ_STATUS.SUCCESS
		}
		default:
		return state;
	}
}