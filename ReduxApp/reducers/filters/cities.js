import { WEB_REQ_STATUS }					from '../../constants';

import { TOGGLE_CITY_SELECTION }			from '../../actions';
import { REQUEST_CITIES_LIST }				from '../../actions';
import { RESPONSE_CITIES_LIST }				from '../../actions';


export const cities = ( state, action ) => {
	switch ( action.type ) {

		case TOGGLE_CITY_SELECTION:

		return {
			...state,
			list: state.list.map( city => {
				return city.id !== action.selectCityId
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
			list: getUnicCities( state.list, [] ),
			reqStatus: WEB_REQ_STATUS.ERROR
		}
		return {
			...state,
			list: getUnicCities( state.list, action.response.items || []),
			reqStatus: WEB_REQ_STATUS.SUCCESS
		}
		default:
			return state;
	}
}

const getUnicCities = (oldList, newList) => {
	let resultList = oldList.filter( city => city.selectedStatus)
	newList.forEach( newCity => {
		!resultList.some( oldCity => oldCity.id == newCity.id)
		&& resultList.push({
			id: +newCity.id,
			name: newCity.text,
			selectedStatus: false
		})
	})
	return resultList
}