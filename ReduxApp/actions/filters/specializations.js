export const TOGGLE_SPECIALIZATION_SELECTION = 'TOGGLE_SPECIALIZATION_SELECTION';
export const REQUEST_SPECIALIZATIONS_LIST = 'REQUEST_SPECIALIZATIONS_LIST';
export const RESPONSE_SPECIALIZATIONS_LIST = 'RESPONSE_SPECIALIZATIONS_LIST';

export const selectSpecialization = selectedSpecializationId => {
	return {
		type: TOGGLE_SPECIALIZATION_SELECTION,
		selectedSpecializationId
	}
}

const requestSpecializationsList = () => {
	return {
		type: REQUEST_SPECIALIZATIONS_LIST
	}
}

const responseSpecializationsList = response => {
	return {
		type: RESPONSE_SPECIALIZATIONS_LIST,
		response
	}
}

export const fetchSpecializationsList = str => {
	return ( dispatch, getState ) => {
		if(str.length < 2) {
			dispatch( responseSpecializationsList({}) );
			return;
		}
		dispatch( requestSpecializationsList() )
		fetch( `${getState().filters.specializations.URL}${str}` )
			.then( resp => resp.json() )
			.then( data => {
				dispatch( responseSpecializationsList(data) )
			})
			.catch( err => {
				dispatch( responseSpecializationsList({}) )
				console.error("Errors in ../containers/HeaderToolBar.jsx:requesteCitiesList", err)
			})
	}
}