export const UPDATE_DISPLAYED_VACANCIES = 'UPDATE_DISPLAYED_VACANCIES';
export const REQUEST_VACANCIES_SEARCH = 'REQUEST_VACANCIES_SEARCH';
export const RESPONSE_VACANCIES_SEARCH = 'RESPONSE_VACANCIES_SEARCH';


export const localSearch = displayedVacancies => {
	return {
		type: UPDATE_DISPLAYED_VACANCIES,
		displayedVacancies
	}
}

const requestVacanciesSearch = () => {
	return {
		type: REQUEST_VACANCIES_SEARCH
	}
}

const responseVacanciesSearch = response => {
	return {
		type: RESPONSE_VACANCIES_SEARCH,
		response
	}
}

export const fetchVacanciesSearch = URL => {
	return ( dispatch, getState ) => {
		dispatch( requestVacanciesSearch() )

		fetch( URL )
			.then( resp => resp.json() )
			.then( response => {
				dispatch( responseVacanciesSearch( response ) )
			})
			.catch( error => {
				dispatch( responseVacanciesSearch( error ) )
		});
	}
}