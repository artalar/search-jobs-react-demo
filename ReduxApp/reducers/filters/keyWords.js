import { getUnicItems }						from '../../utils/reducers/filters'

import { WEB_REQ_STATUS }					from '../../constants';

import { TOGGLE_KEY_WORD_SELECTION }		from '../../actions/filters/keyWords';
import { REQUEST_KEY_WORDS_LIST }			from '../../actions/filters/keyWords';
import { RESPONSE_KEY_WORDS_LIST }			from '../../actions/filters/keyWords';


export const keyWords = ( state, action ) => {
	switch ( action.type ) {

		case TOGGLE_KEY_WORD_SELECTION:

		return {
			...state,
			list: state.list.map( keyWord => {
				return keyWord.id !== action.selectedKeyWordId
					? keyWord
					: {
						...keyWord,
						selectedStatus: !keyWord.selectedStatus
					}
			})
		}
		case REQUEST_KEY_WORDS_LIST:

		return {
			...state,
			reqStatus: WEB_REQ_STATUS.IS_LOADING
		}
		case RESPONSE_KEY_WORDS_LIST:

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