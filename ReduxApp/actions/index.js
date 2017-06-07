export const CHANGE_SALARY_REQUIRE_STATUS = 'CHANGE_SALARY_REQUIRE_STATUS';
export const CHANGE_CITYS_SELECTED_LIST = 'CHANGE_CITYS_SELECTED_LIST';
export const LIKE_VACANCY = 'LIKE_VACANCY';
export const END_REMOTE_SEARCH = 'END_REMOTE_SEARCH';
export const START_REMOTE_SEARCH = 'START_REMOTE_SEARCH';
export const UPDATE_DISPLAYED_VACANCIES = 'UPDATE_DISPLAYED_VACANCIES';

export const localSearch = event => {
	return {
		type: 'SEARCH_LOCALLY',
		searchQuery: event.target.value.toLowerCase()
	}
}

export const changeSalaryReq = () => {
	return {
		type: CHANGE_SALARY_REQUIRE_STATUS
	}
}

export const selectCity = (value) => {

	return {
		type: CHANGE_CITYS_SELECTED_LIST,
		selectSityId: value
	}
}

export const networkReq = () => { //activate loadbar
	return {
		type: 'START_REMOTE_SEARCH'
	}
}


export const networkResp = json => {
	return {
		type: 'END_REMOTE_SEARCH',
		json
	}
}


export const networkErr = json => {
	return {
		type: 'END_REMOTE_SEARCH',
		json: []
	}
}


export const remoteSearch = url => {
	return dispatch => {
		
		dispatch(networkReq());
		
		return fetch(url)
			.then(resp => resp.json())
			.then(json => dispatch(networkResp(json)))
			.catch(error => dispatch(networkErr()))
	}
}