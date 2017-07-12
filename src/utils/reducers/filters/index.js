export const getUnicItems = (oldList, newList) => {
	// keep up selected items
	let resultList = oldList.filter( item => item.selectedStatus)
	// add new items
	newList.forEach( newItem => {
		!resultList.some( oldItem => oldItem.id == newItem.id)
		&& resultList.push({
			id: newItem.id || newItem.text,
			name: newItem.text,
			selectedStatus: false
		})
	})
	return resultList
}