import React								from 'react';
import { Component }						from 'react';
import PropTypes							from 'prop-types';
import CircularProgress						from 'material-ui/CircularProgress';
import SearchField							from 'material-ui/TextField';
import Snackbar								from 'material-ui/Snackbar';

import { WEB_REQ_STATUS }					from '../constants';

import VacancyCard							from '../components/VacancyCard.jsx';
import EmptySearch							from '../components/EmptySearch.jsx';

import { localSearch }						from '../actions'


export default class VacancyList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SnackbarStatus: false,
			SearchCount: '0',
		};
	};
	componentDidMount() {
		this.props.remoteSearch()
	};
	componentWillReceiveProps(nextProps) {
		this.setState({
			SnackbarStatus: this.props.displayedVacancies.length !== nextProps.displayedVacancies.length,
			SearchCount: nextProps.displayedVacancies.length,
		})
	}

	onSnackbarClose = () => {
		this.setState({
			SnackbarStatus: false
		});
	}

	handleSearch = event => {
		const	searchQuery = event.target.value.toLowerCase();
		let		displayedVacancies;

		if ( !searchQuery ) {
			this.props.dispatch( localSearch( this.props.downloadedVacancies ) )
			this.setState({
				SearchCount: this.props.downloadedVacancies.length
			})
			return;
		}

		displayedVacancies = this.props.downloadedVacancies.filter( vacancy => {
			const searchValue = vacancy.name.toLowerCase() +
				'/n' + (vacancy.snippet['responsibility'] ? vacancy.snippet.responsibility.toLowerCase() : '') +
				'/n' + vacancy.employer.name.toLowerCase();
			return searchValue.indexOf( searchQuery ) !== -1;
		})

		this.props.dispatch(localSearch( displayedVacancies ))

		this.setState({
			SnackbarStatus: true,
			SearchCount: displayedVacancies.length
		});
	};

	render() {
		if ( this.props.loading === WEB_REQ_STATUS.IS_LOADING ) return (
			<div className='LoadBar' style={{
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-around"
			}}>
				<CircularProgress size={100} thickness={10}/>
			</div>
		)
		if ( !this.props.downloadedVacancies.length ) return (
			<div style={{textAlign: 'center', color: '#AAA', width: '90vmin'}}>
				<EmptySearch state={true}/>
				<br/>
				Ничего не найдено
			</div>
		)
		return (
			<div style={{width: '90vmin'}}>
				<SearchField
					hintText="Поиск по вакансиям"
					fullWidth={true}
					onChange={this.handleSearch}
				/>
				<div>
					{
						this.props.displayedVacancies.map( el => {
							let key = '' + el.alternate_url.match(/\d+/);
							return (
								<div key={key}>
									<VacancyCard
										info={el}
										{...{
											params: 'params',
											qqq: 'qqq'
										}}
									/>
									<br />
								</div>
							)
						})
					}
					<Snackbar
						open={this.state.SnackbarStatus}
						message={"Найдено: " + this.state.SearchCount}
						autoHideDuration={2000}
						onRequestClose={this.onSnackbarClose}
					/>
				</div>
			</div>
		);
	}
}

VacancyList.defaultProps = {
	displayedVacancies: [],
	downloadedVacancies: []
}

VacancyList.propTypes = {
	downloadedVacancies: PropTypes.array.isRequired,
	displayedVacancies: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
}