export const TOGGLE_KEY_WORD_SELECTION = 'TOGGLE_KEY_WORD_SELECTION';
export const REQUEST_KEY_WORDS_LIST = 'REQUEST_KEY_WORDS_LIST';
export const RESPONSE_KEY_WORDS_LIST = 'RESPONSE_KEY_WORDS_LIST';


export const selectKeyWord = selectedKeyWordId => {
	return {
		type: TOGGLE_KEY_WORD_SELECTION,
		selectedKeyWordId
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