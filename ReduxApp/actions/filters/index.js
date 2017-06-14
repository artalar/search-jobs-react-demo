export const CLEAN_ALL_FILTERS = 'CLEAN_ALL_FILTERS';
export const CHANGE_SALARY_REQUIRE_STATUS = 'CHANGE_SALARY_REQUIRE_STATUS';

export const cleanAllFilters = () => {
	return {
		type: CLEAN_ALL_FILTERS
	}
}

export const changeSalaryReqStatus = () => {
	return {
		type: CHANGE_SALARY_REQUIRE_STATUS
	}
}