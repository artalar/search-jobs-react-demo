import React, { Component } from 'react';
import VacancyCard from './VacancyCard.js';
import EmptySearch from './EmptySearch.js';
import CircularProgress from 'material-ui/CircularProgress';
import SearchField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

export default class VacancyList extends React.Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.remoteSearch = this.remoteSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.props.sitys.update = this.remoteSearch;
        this.props.salary.update = this.remoteSearch;
        this.state = {
            loadBar: true,
            displayedVacancy: false,
            loadVacancy: false,
            SnackbarStatus: false,
            SearchCount: '',
            sitys: this.props.sitys.list,
            withSalary: this.props.salary.status
        };
    };
    componentDidMount = function(){
        this.remoteSearch(this.state.sitys, '&area')
    };
    remoteSearch = function(urlParams, urlParamsType){
        //only_with_salary=true
        let updateState = this.updateState,
            url = 'https://api.hh.ru/vacancies?specialization=1.221&per_page=50', //default url
            emptyResult = {
                loadBar: false,
                loadVacancy: [],
                displayedVacancy: [],
                SnackbarStatus: true,
                SearchCount: [].length
            };
        updateState({loadBar: true});
        if(!urlParams.length | !urlParams){
            updateState(emptyResult);
            return;
        }
        switch (urlParamsType) {
            case '&area':
                url = getUrlForSearchBySytys();
                break;
            case '&only_with_salary':
                url = getUrlForSearchBySalary();
                break;
            default:
                break;
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
        
        function getUrlForSearchBySytys(){
            urlParams = urlParams.map((item) =>{
                switch(item){
                    case 0:
                        item = 1;
                        break
                    case 1:
                        item = 2;
                        break
                    case 2:
                        item = 43;
                        break
                    default:
                        item = 1;
                }
                return (urlParamsType + '=' + item)
            }).join('');
            return url + urlParams;
        };
        function getUrlForSearchBySalary(){
            return url + urlParamsType + '=' + urlParams
        }
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
            <div className='LoadBar'>
                <br />
                <CircularProgress size={100} thickness={10}/>
            </div>
        )
        if(!this.state.loadVacancy.length){
            return (
                <div className="VacancyList" style={{textAlign: 'center', color: '#AAA'}}>
                    <EmptySearch state={true}/>
                    <br/>
                    Ничего не найдено
                </div>
            )
        }
        return (
            <div className="VacancyList">
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
                        autoHideDuration={1500}
                    />
                </div>
            </div>
        );
    }
}