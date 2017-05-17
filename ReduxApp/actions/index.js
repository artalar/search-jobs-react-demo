export const localSearch = event => {
	return {
		type: 'SEARCH_LOCALLY',
		searchQuery: event.target.value.toLowerCase()
	}
}


function networkReq() { //activate loadbar
	return {
		type: 'SEND_NETWORK_REQUEST'
	}
}


function networkResp(json) {
	return {
		type: 'PARSE_NETWORK_RESPONSE',
		json
	}
}


export const remoteSearch = url => {
	return dispatch => {
		
		dispatch(networkReq());
		
		return fetch(url)
			.then(resp => resp.json())
			.then(json => dispatch(networkResp(json)))
			.catch(error => dispatch(networkResp(error)))
	}
}