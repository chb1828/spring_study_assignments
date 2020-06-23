import React, {Component} from "react";
import {Button, ButtonGroup, Card, Col, Form, Image, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import AuthService from "../services/auth-service";
import axios from "axios";
import {Link} from "react-router-dom";

    export default class LoginPage extends Component{

        constructor(props) {
            super(props);
            this.state = this.initialState;
            this.loginChange=this.loginChange.bind(this)
        }

        initialState = {
            username:'',
            password:'',
            check: false
        };

        loginChange = event => {
            this.setState({
                [event.target.name]: event.target.value
            });
        };
    loginUser = event => {
        event.preventDefault();
        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/");
                window.location.reload();
            },
            error => {
                this.setState({
                    check:true
                });
            }
        );
        this.setState(this.initialState);
    };


    render() {
        const {username,password} = this.state;
        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"} style={{width:"1000px"}}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Login</Card.Header>
                    <Card.Body>
                        <Form id="loginFormId" onSubmit={this.loginUser} className={"border border-dark bg-dark text-white"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" name="username" onChange={this.loginChange} value={username}/>
                                <Form.Text className="text-muted">
                                    We'll never share your ID with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={this.loginChange} value={password}/>
                            </Form.Group>
                            {this.state.check === true &&
                                <p>아이디 또는 비밀번호가 잘못됬습니다.</p>
                            }
                            <Button variant="warning" type="button"><Link to="registration">회원가입</Link></Button>
                            <Button variant="primary" type="submit" style={{"float":"right"}}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
