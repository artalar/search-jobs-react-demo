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

export const fetchVacanciesSearch = () => {
	return ( dispatch, getState ) => {
		dispatch( requestVacanciesSearch() )
		const { keyWords, cities, specializations } = getState().filters;

		const URL = getState().URL +

			keyWords.list.reduce( (acc, item) => {
				return item.selectedStatus ? `${acc.length > 5 ? acc + '+OR+' : acc}${item.id}` : acc
			}, 'text=') +

			cities.list.reduce( (acc, item) => {
				return item.selectedStatus ? acc+`&area=${item.id}` : acc
			}, '') +

			specializations.list.reduce( (acc, item) => {
				return item.selectedStatus ? acc+`&specialization=${item.id}` : acc
			}, '')
console.log(URL)
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