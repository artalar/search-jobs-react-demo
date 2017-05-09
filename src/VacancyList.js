import React, { Component } from 'react';
import VacancyCard from './VacancyCard.js';
import EmptySearch from './EmptySearch.js';
import CircularProgress from 'material-ui/CircularProgress';
import SearchField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

export default class VacancyList extends React.Component {
    constructor(props) {
        super(props);
        this.props.remoteSearch.do = this.remoteSearch;
        this.updateState = this.updateState.bind(this);
        this.remoteSearch = this.remoteSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            loadBar: true,
            displayedVacancy: false,
            loadVacancy: false,
            SnackbarStatus: false,
            SearchCount: '0',
        };
    };
    componentDidMount = function(){
        this.remoteSearch()
    };
    remoteSearch = () => {
        let updateState = this.updateState,
            url = this.props.getURL(),
            emptyResult = {
                loadBar: false,
                loadVacancy: [],
                displayedVacancy: [],
                SnackbarStatus: true,
                SearchCount: [].length
            };
        updateState({loadBar: true});
        if(!url.match('area')){
            updateState(emptyResult);
            return;
        }
        fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                if('errors' in data){
                    console.log(data);
                    updateState(emptyResult);
                    return;
                }
                updateState({
                    loadBar: false,
                    loadVacancy: data.items,
                    displayedVacancy: data.items,
                    SnackbarStatus: true,
                    SearchCount: data.items.length
                });
            })
            .catch(function(error) {
                console.log(error);
                return undefined;
        });
    };
    handleSearch = function(event) {
        let searchQuery = event.target.value.toLowerCase(), displayedVacancy;
        if(!searchQuery) {
            this.setState({
                displayedVacancy: this.state.loadVacancy,
                SearchCount: this.state.loadVacancy.length
            })
            return;
        }
        displayedVacancy = this.state.loadVacancy.filter(function(el) {
            let searchValue = el.name.toLowerCase() +
                '/n' + (el.snippet['responsibility'] ? el.snippet.responsibility.toLowerCase() : '') +
                '/n' + el.employer.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedVacancy: displayedVacancy,
            SnackbarStatus: true,
            SearchCount: displayedVacancy.length
        });
    };
    updateState = function(state){
        this.setState(state);
    };
    render = function() {
        if (this.state.loadBar) return (
            <div className='LoadBar' style={{texAlign: 'center'}}>
                <br />
                <CircularProgress size={100} thickness={10}/>
            </div>
        )
        if(!this.state.loadVacancy.length){
            return (
                <div className="VacancyList" style={{textAlign: 'center', color: '#AAA', width: '50vw', margin: '0 auto'}}>
                    <EmptySearch state={true}/>
                    <br/>
                    Ничего не найдено
                </div>
            )
        }
        return (
            <div className="VacancyList" style={{width: '50vw', margin: '0 auto'}}>
                <SearchField hintText="Поиск по вакансиям" fullWidth={true} onChange={this.handleSearch}/>
                <div>
                    {
                        this.state.displayedVacancy.map(function(el) {
                            let key = '' + el.alternate_url.match(/\d+/);
                            return (
                                <div key={key}>
                                    <VacancyCard data={el} />
                                    <br />
                                </div>
                            )
                        })
                    }
                    <Snackbar
                        open={this.state.SnackbarStatus}
                        message={"Найдено: " + this.state.SearchCount}
                        autoHideDuration={2000}
                    />
                </div>
            </div>
        );
    }
}