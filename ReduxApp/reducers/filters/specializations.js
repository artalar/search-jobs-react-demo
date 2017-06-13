import { getUnicItems }						from '../../utils/reducers/filters'

import { WEB_REQ_STATUS }					from '../../constants';

import { TOGGLE_SPECIALIZATION_SELECTION }	from '../../actions/filters/specializations';
import { REQUEST_SPECIALIZATIONS_LIST }		from '../../actions/filters/specializations';
import { RESPONSE_SPECIALIZATIONS_LIST }	from '../../actions/filters/specializations';

export const specializations = ( state, action ) => {
	switch ( action.type ) {

		case TOGGLE_SPECIALIZATION_SELECTION:
		return {
			...state,
			list: state.list.map( specialization => {
				return specialization.id !== action.selectedSpecializationId
					? specialization
					: {
						...specialization,
						selectedStatus: !specialization.selectedStatus
					}
			})
		}
		case REQUEST_SPECIALIZATIONS_LIST:
		return {
			...state,
			reqStatus: WEB_REQ_STATUS.IS_LOADING
		}
		case RESPONSE_SPECIALIZATIONS_LIST:
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