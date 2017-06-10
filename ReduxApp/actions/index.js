export const CHANGE_SALARY_REQUIRE_STATUS = 'CHANGE_SALARY_REQUIRE_STATUS';
export const TOGGLE_CITY_SELECTION = 'TOGGLE_CITY_SELECTION';
export const REQUEST_CITIES_LIST = 'REQUEST_CITIES_LIST';
export const RESPONSE_CITIES_LIST = 'RESPONSE_CITIES_LIST';


export const changeSalaryReqStatus = () => {
	return {
		type: CHANGE_SALARY_REQUIRE_STATUS
	}
}

export const selectCity = selectCityId => {
	return {
		type: TOGGLE_CITY_SELECTION,
		selectCityId
	}
}

export const requestCitiesList = () => {
	return {
		type: REQUEST_CITIES_LIST
	}
}

export const responseCitiesList = response => {
	return {
		type: RESPONSE_CITIES_LIST,
		response
	}
}

export const fetchCitiesList = str => {
	return ( dispatch, getState ) => {
		if(str.length < 2) {
			dispatch( responseCitiesList({}) );
			return;
		}
		dispatch( requestCitiesList() )
		fetch( `${getState().filters.cities.URL}${str}` )
			.then( resp => resp.json() )
			.then( data => {
				dispatch( responseCitiesList(data) )
			})
			.catch( err => {
				dispatch( responseCitiesList({}) )
				console.error("Errors in ../containers/HeaderToolBar.jsx:requesteCitiesList", err)
			})
	}
}



// OLD


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