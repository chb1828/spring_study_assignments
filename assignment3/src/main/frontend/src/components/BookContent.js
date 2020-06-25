import React,{Component} from "react";
import MyToast from "./MyToast";
import {Button, ButtonGroup, Card, Col, Form, FormControl, Image, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faFastBackward, faFastForward,
    faList, faPlusSquare, faSave,
    faSearch,
    faStepBackward, faStepForward,
    faTimes,
    faTrash, faUndo
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";
import AuthService from "../services/auth-service";


export default class BookContent extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.goBack = this.goBack.bind(this);
    }

    initialState = {
        id:'',
        title: '',
        author: '',
        coverPhotoURL: '',
        isbnNumber: '',
        price: '',
        language:'',
        genre:''
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
                        language: response.data.language,
                        genre: response.data.genre
                    });
                }
            }).catch((error) => {
            console.log("Error -" + error);
        });
    };

    goBack = () => {
        this.props.history.goBack();
    };

    render() {

        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"} style={{width: "1000px"}}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faEdit}/> {"Read Book"}
                    </Card.Header>
                    <Form id="bookFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="title"
                                                  value={title}
                                                  placeholder="Enter Book Title"
                                                  className={"bg-dark text-white"} readOnly/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control required
                                                  type="text" name="author"
                                                  value={author}
                                                  placeholder="Enter Book Author"
                                                  className={"bg-dark text-white"} readOnly/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Cover Photo URL</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="coverPhotoURL"
                                                  value={coverPhotoURL}
                                                  placeholder="Enter Book Cover Photo URL"
                                                  className={"bg-dark text-white"} readOnly/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>ISBN Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="isbnNumber"
                                                  value={isbnNumber}
                                                  placeholder="Enter Book ISBN Number"
                                                  className={"bg-dark text-white"} readOnly/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="price"
                                                  value={price}
                                                  placeholder="Enter Book Price"
                                                  className={"bg-dark text-white"} readOnly/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="language"
                                                  value={language}
                                                  className={"bg-dark text-white"} readOnly>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="genre"
                                                  value={genre}
                                                  className={"bg-dark text-white"} readOnly>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                                <Button onClick={this.goBack}>뒤로가기</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}