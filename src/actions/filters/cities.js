export const TOGGLE_CITY_SELECTION = 'TOGGLE_CITY_SELECTION';
export const REQUEST_CITIES_LIST = 'REQUEST_CITIES_LIST';
export const RESPONSE_CITIES_LIST = 'RESPONSE_CITIES_LIST';


export const selectCity = selectedCityId => {
	return {
		type: TOGGLE_CITY_SELECTION,
		selectedCityId
	}
}

const requestCitiesList = () => {
	return {
		type: REQUEST_CITIES_LIST
	}
}

const responseCitiesList = response => {
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