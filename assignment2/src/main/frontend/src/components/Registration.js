import React, {Component} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import AuthService from "../services/auth-service";

export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.registrationChange=this.registrationChange.bind(this)
    }

    initialState = {
        username:'',
        password:'',
        age:'',
        description:''
    };

    registrationChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    registrationUser = event => {
        event.preventDefault();
        AuthService.register(this.state.username, this.state.password,this.state.age,this.state.description).then(
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
        const {username,password,age,description} = this.state;
        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"} style={{width: "1000px"}}>
                    <Form id="registrationFormId" onSubmit={this.registrationUser} className={"border border-dark bg-dark text-white"}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter ID" name="username" onChange={this.registrationChange} value={username}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={this.registrationChange} value={password}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control name="age" placeholder="나이" onChange={this.registrationChange} value={age}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" placeholder="Unnecessary" onChange={this.registrationChange} value={description}/>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit" style={{"float":"right"}}>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </div>
        );
    }
}
