import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    message;
    constructor(props) {
        super(props);
        this.state = {
            message:""
        }
        fetch("/api/hello")
            .then(res=>res.text())
            .then(
                (result)=>{
                    this.setState({
                        message: result
                    });
                }
            );
    }
        render()
        {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">{this.state.message}</h1>
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React4
                        </a>
                    </header>
                </div>
            );
        }


    }

export default App;
