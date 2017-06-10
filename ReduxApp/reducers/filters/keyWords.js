import { WEB_REQ_STATUS }					from '../../constants';

import { TOGGLE_KEY_WORD_SELECTION }		from '../../actions';
import { REQUEST_KEY_WORDS_LIST }			from '../../actions';
import { RESPONSE_KEY_WORDS_LIST }			from '../../actions';


export const keyWords = ( state, action ) => {
	switch ( action.type ) {

		case TOGGLE_KEY_WORD_SELECTION:

		return {
			...state,
			list: state.list.map( keyWord => {
				return keyWord.id !== action.selectKeyWordId
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
			list: getUnicKeyWords( state.list, [] ),
			reqStatus: WEB_REQ_STATUS.ERROR
		}
		return {
			...state,
			list: getUnicKeyWords( state.list, action.response.items || []),
			reqStatus: WEB_REQ_STATUS.SUCCESS
		}
		default:
			return state;
	}
}

const getUnicKeyWords = (oldList, newList) => {
	let resultList = oldList.filter( keyWord => keyWord.selectedStatus)
	newList.forEach( newKeyWord => {
		!resultList.some( oldKeyWord => oldKeyWord.id == newKeyWord.id)
		&& resultList.push({
			id: newKeyWord.text,
			name: newKeyWord.text,
			selectedStatus: false
		})
	})
	return resultList
}