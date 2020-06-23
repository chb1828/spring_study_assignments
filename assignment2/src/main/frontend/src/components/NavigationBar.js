import React, {Component} from 'react';
import {Navbar, Nav, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthService from "../services/auth-service";


class NavigationBar extends Component{

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        AuthService.logout();
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link className="navbar-brand" to={"/"}>
                    <img src="https://i.pinimg.com/originals/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.png" width="25" height="25" alt="brand"/>
                    Book Shop
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={"add"} className="navbar-brand">Add Book</Link>
                        <Link to={"list"} className="navbar-brand">Book List</Link>
                        <Link to={"users"} className="navbar-brand">User List</Link>
                        {this.props.currentUser !== undefined ? (
                            <a href="/" className="navbar-brand" onClick={this.logOut}>Logout</a>
                        ) : (
                            <Link to={"loginPage"} className="navbar-brand">Login</Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default NavigationBar;