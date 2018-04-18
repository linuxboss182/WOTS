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
            currentPosition: null
        };

        this.setBusinessData = this.setBusinessData.bind(this);
        this.setCurrentPosition = this.setCurrentPosition.bind(this);
    }

    componentDidMount() {
        // // Test call 1
        // this.callApi('/api/hello')
        //     .then(res => this.setState({ response: res.express }))
        //     .catch(err => console.log(err));

        // // Test call 2
        // this.callApi('/')
        //     .then(res => this.setState({ anotherresponse: res.express }))
        //     .catch(err => console.log(err));
    }

    setBusinessData(data) {
        this.setState({businessData: data});
    }

    setCurrentPosition(data) {
        this.setState({currentPosition: data});
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
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">{this.state.response}</p>
                <p className="App-intro">{this.state.anotherresponse}</p> */}
                <NavBar />
                <SearchBar setBusinessData={this.setBusinessData} setCurrentPosition={this.setCurrentPosition}/>
                <ResultsPage businessData={this.state.businessData} currentPosition={this.state.currentPosition}/>
            </div>
        );
    }
}

export default App;