import React								from 'react';
import { Component }								from 'react';
import PropTypes							from 'prop-types';
import { CardHeader }						from 'material-ui/Card';
import { CardActions }						from 'material-ui/Card';
import { CardMedia }						from 'material-ui/Card';
import { CardTitle }						from 'material-ui/Card';
import { CardText }							from 'material-ui/Card';
import { Card }								from 'material-ui/Card';
import FlatButton							from 'material-ui/FlatButton';
import Checkbox								from 'material-ui/Checkbox';
import ActionFavorite						from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder					from 'material-ui/svg-icons/action/favorite-border';

import logo								from '../src/hh_2015.jpg'

export default class VacancyCard extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			info: this.convertResponseInfo( this.props.info ),
			likeStatus: !!localStorage.getItem( this.props.info.alternate_url )
		};
	};

	likeVacancy = ( event, status ) => {
		localStorage.setItem( this.state.info.link, status );

		this.setState({
			likeStatus: status
		});
	};

	convertResponseInfo = info => {
		return {
			name: info.name,
			link: info.alternate_url,
			description: info.snippet['responsibility'] ? info.snippet['responsibility'] : "Детальное описание доступно на сайте...",
			area: info.area.name,
			salary: ( () => {
				const salary = info.salary;

				switch ( true ) {
					default:
					case ( !salary ):
					return 'Договорная'

					case ( salary.from && salary.to ):
					return `От ${salary.from} До ${salary.to} ${salary.currency}`;

					case ( !!salary.from ):
					return `От ${salary.from} ${salary.currency}`;

					case ( !!salary.to ):
					return `До ${salary.to} ${salary.currency}`;
				}
			})(),
			employerName: info.employer.name,
			employerImg: info.employer.logo_urls ? info.employer.logo_urls["90"] : logo,
			employerProfile: info.employer.alternate_url
		}
	};

	render() {
		const { employerProfile, employerName, employerImg, area, name, salary, description, link } = this.state.info;

		return (
		<Card>
			<a href={ employerProfile } target="_blank"><CardHeader
				title={ employerName }
				avatar={ employerImg }
				subtitle={ area }
			/></a>
			<CardTitle
				title={ name }
				subtitle={ salary }
			/>
			<CardText>
				{ description }
			</CardText>
			<CardActions>
			<div
				style={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } }
			>
				<div >
				<FlatButton
					label="Откликнуться" href={ this.state.info.link }
				/>
				</div >
				<div >
				<Checkbox
					checked={ this.state.likeStatus }
					checkedIcon={ <ActionFavorite /> }
					uncheckedIcon={ <ActionFavoriteBorder /> }
					onCheck={ this.likeVacancy }
				/>
				</div>
			</div>
			</CardActions>
		</Card>
		);
	}
}

VacancyCard.propTypes = {
	info: PropTypes.shape ({
		name: PropTypes.string.isRequired,
		alternate_url: PropTypes.string.isRequired,
		snippet: PropTypes.object,
		area: PropTypes.object.isRequired,
		salary: PropTypes.shape ({
			currency: PropTypes.string,
			from: PropTypes.number,
			to: PropTypes.number
		}),
		employer: PropTypes.shape ({
			name: PropTypes.string.isRequired,
			logo_urls: PropTypes.object,
			alternate_url: PropTypes.string.isRequired
		})
	})
}