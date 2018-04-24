import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import ResultsPage from './ResultsPage';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            businessData: null,
            currentPosition: null,
            zipCodeText: null,
        };

        this.setBusinessData = this.setBusinessData.bind(this);
        this.setCurrentPosition = this.setCurrentPosition.bind(this);
        this.setZipCode = this.setZipCode.bind(this);
    }

    setBusinessData(data) {
        this.setState({businessData: data});
    }

    setCurrentPosition(data) {
        this.setState({currentPosition: data});
    }

    setZipCode(data) {
        this.setState({zipCodeText: data});
    }

    callApi = async (path) => {
        const response = await fetch(path);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };



    render() {
        return (
            <div className="App">
                <NavBar />
                <SearchBar setZipCode={this.setZipCode} setBusinessData={this.setBusinessData} setCurrentPosition={this.setCurrentPosition}/>
                <ResultsPage zipCode={this.state.zipCodeText} setBusinessData={this.setBusinessData} businessData={this.state.businessData} currentPosition={this.state.currentPosition}/>
            </div>
        );
    }
}

export default App;