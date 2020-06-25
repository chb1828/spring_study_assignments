import React, {Component} from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Col, Container, Row, Switch} from "react-bootstrap";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Book from "./components/Book";
import BookList from "./components/BookList";
import {BrowserRouter as Router,Route} from "react-router-dom";
import UserList from "./components/UserList";
import LoginPage from "./components/LoginPage";
import AuthService from "./services/auth-service";
import Registration from "./components/Registration";
import BookContent from "./components/BookContent";



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        }
    }
    componentDidMount() {
        const token = AuthService.getCurrentUser();

        if (token) {
            this.setState({
                currentUser: token
            });
        }
    }
    render() {
        return (
            <Router>
                <NavigationBar/>
                <Container>
                    <Row>
                        <Col lg={12} className={"margin-top"}></Col>
                        <Switch>
                            <Route path="/" exact component={Welcome}/>
                            <Route path="/add" exact component={Book}/>
                            <Route path="/edit/:id" exact component={Book}/>
                            <Route path="/list" exact component={BookList}/>
                            <Route path="/users" exact component={UserList}/>
                            <Route path="/loginPage" exact component={LoginPage}/>
                            <Route path="/registration" exact component={Registration}/>
                            <Route path="/read/:id" exact component={BookContent}/>
                        </Switch>
                    </Row>
                </Container>
                <Footer/>
            </Router>
        );
    }

}

export default App;
