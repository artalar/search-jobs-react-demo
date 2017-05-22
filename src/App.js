import React, { Component } from 'react';
import VacancyList from './VacancyList.js';
import ToolBar from './ToolBar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.updateCitysSelectedList.bind(this);
        this.updateSalaryRequireStatus.bind(this);
        this.getURL.bind(this);
        this.state = {
            defaultUrl: 'https://api.hh.ru/vacancies?specialization=1.221&per_page=50',
            
            citysSelectedList: this.getSavecitysSelectedList(),
            salaryRequireStatus: this.getSaveSalaryRequireStatus(),
            //это такой ручной управлятель состоянием
            remoteSearch: {
                do: () => {}
            }
        };
    };
    
    getSavecitysSelectedList = () => {
        let result = JSON.parse(localStorage.getItem('citysSelectedList'));
        return result === null ? [0,1,2] : result //default value
    }

    getSaveSalaryRequireStatus = () => {
        let result = JSON.parse(localStorage.getItem('salaryRequireStatus'));
        return result === null ? true : result //default value
    }

    updateCitysSelectedList (event, index, list) {
        localStorage.setItem('citysSelectedList', JSON.stringify(list));
        this.setState({citysSelectedList: list})
        let remoteSearch =  this.state.remoteSearch.do;
        //кастыль, что бы setState успел отработать
        setTimeout(remoteSearch, 4);
    };

    updateSalaryRequireStatus = (event, status, value) => {
        localStorage.setItem('salaryRequireStatus', status);
        this.setState({salaryRequireStatus: status});
        let remoteSearch =  this.state.remoteSearch.do;
        //кастыль, что бы setState успел отработать
        setTimeout(remoteSearch, 4);
    };
    getURL = () => {
        let url = this.state.defaultUrl,
            cList = this.state.citysSelectedList,
            sStatus = this.state.salaryRequireStatus;
        if(!!cList.length) url += getUrlForSearchByCitys();
        if(!!sStatus) url += '&only_with_salary=true';
        console.log(url);
        return url;

        function getUrlForSearchByCitys(){
            return cList.map((item) =>{
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
                return ('&area=' + item)
            }).join('');
        };
    }

    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <ToolBar
                        citysSelectedList={this.state.citysSelectedList}
                        salaryRequireStatus={this.state.salaryRequireStatus}
                        updateCitysSelectedList={this.updateCitysSelectedList}
                        updateSalaryRequireStatus={this.updateSalaryRequireStatus}
                    />
                    <VacancyList
                        getURL={this.getURL}
                        remoteSearch={this.state.remoteSearch}
                        salaryRequireStatus={this.state.salaryRequireStatus}
                    />
                </div>
            </MuiThemeProvider>
        )
    };
}



