import { TOGGLE_KEY_WORD_SELECTION }		from '../index';
import { REQUEST_KEY_WORDS_LIST }			from '../index';
import { RESPONSE_KEY_WORDS_LIST }			from '../index';


export const selectKeyWord = selectKeyWordId => {
	return {
		type: TOGGLE_KEY_WORD_SELECTION,
		selectKeyWordId
	}
}

const requestKeyWordsList = () => {
	return {
		type: REQUEST_KEY_WORDS_LIST
	}
}

const responseKeyWordsList = response => {
	return {
		type: RESPONSE_KEY_WORDS_LIST,
		response
	}
}

export const fetchKeyWordsList = str => {
	return ( dispatch, getState ) => {
		if(str.length < 2) {
			dispatch( responseKeyWordsList({}) );
			return;
		}
		dispatch( requestKeyWordsList() )
		fetch( `${getState().filters.keyWords.URL}${str}` )
			.then( resp => resp.json() )
			.then( data => {
				dispatch( responseKeyWordsList(data) )
			})
			.catch( err => {
				dispatch( responseKeyWordsList({}) )
				console.error("Errors in ../containers/HeaderToolBar.jsx:requesteCitiesList", err)
			})
	}
}