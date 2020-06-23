import React, {Component} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import MyToast from "./MyToast";
import AuthService from "../services/auth-service";

export default class Book extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);

    }

    initialState = {
        id:'',
        title: '',
        author: '',
        coverPhotoURL: '',
        isbnNumber: '',
        price: '',
        language: ''
    };

    componentDidMount() {
        const token = AuthService.getCurrentUser();
        if(!token) {
            alert("로그인이 필요합니다");
            this.props.history.push("/loginPage");
        }
        const bookId = +this.props.match.params.id;
        if(bookId) {
            this.findBookById(bookId);
        }
    }

    findBookById = (bookId) => {
        axios.get("http://localhost:8080/books/"+bookId)
            .then(response => {
                if(response.data !=null) {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        author: response.data.author,
                        coverPhotoURL: response.data.coverPhotoURL,
                        isbnNumber: response.data.isbnNumber,
                        price: response.data.price,
                        language: response.data.language
                    });
                }
            }).catch((error) => {
            console.log("Error -" + error);
        });
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language
        };

        axios.post("http://localhost:8080/books", book)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true,"func":"save"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState);
    };

    updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language
        };

        axios.post("http://localhost:8080/books", book)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true,"func":"update"});
                    setTimeout(() => this.setState({"show": false}), 2000);
                    setTimeout(() => this.bookList(), 1000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState);
    };

    bookChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    bookList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show ={this.state.show} message = {this.state.func === "update" ? "수정 성공" : "저장 성공"} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"} style={{width: "1000px"}}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Book" : "Add New Book"}
                    </Card.Header>
                    <Form id="bookFormId" onSubmit={this.state.id ? this.updateBook : this.submitBook} onReset={this.resetBook}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="title"
                                                  value={title}
                                                  onChange={this.bookChange}
                                                  placeholder="Enter Book Title"
                                                  className={"bg-dark text-white"}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control required
                                                  type="text" name="author"
                                                  value={author}
                                                  onChange={this.bookChange}
                                                  placeholder="Enter Book Author"
                                                  className={"bg-dark text-white"}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Cover Photo URL</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="coverPhotoURL"
                                                  value={coverPhotoURL}
                                                  onChange={this.bookChange}
                                                  placeholder="Enter Book Cover Photo URL"
                                                  className={"bg-dark text-white"}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>ISBN Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="isbnNumber"
                                                  value={isbnNumber}
                                                  onChange={this.bookChange}
                                                  placeholder="Enter Book ISBN Number"
                                                  className={"bg-dark text-white"}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="price"
                                                  value={price}
                                                  onChange={this.bookChange}
                                                  placeholder="Enter Book Price"
                                                  className={"bg-dark text-white"}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="language"
                                                  value={language}
                                                  onChange={this.bookChange}
                                                  placeholder="Enter Book Language"
                                                  className={"bg-dark text-white"}/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                        </Button>
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo}/> Reset
                        </Button>
                        <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()}>
                            <FontAwesomeIcon icon={faList}/> Book List
                        </Button>
                    </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}


