import React, {Component} from "react";
import {Button, ButtonGroup, Card, Image, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from "./MyToast";
import {Link} from "react-router-dom";
import AuthService from "../services/auth-service";

export default class BookList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token: ""
        };
    }

    componentDidMount() {
        this.findAllBooks();
        this.setState({token:AuthService.getCurrentUser()})
    }

    findAllBooks() {
        axios.get("http://localhost:8080/books")
            .then(response => response.data)
            .then((data) => {
                this.setState({books:data})
            })
    }

    deleteBook = (bookId) => {
        if(!this.state.token) {
            alert("로그인 필요");
            return;
        }
        axios.delete("http://localhost:8080/books/"+bookId)
            .then(response => {
                if(response.data !=null) {
                    this.setState({"show":true})
                    setTimeout(()=> this.setState({"show":false}),3000);
                    this.setState({
                        books: this.state.books.filter(book => book.id !== bookId),
                    });
                }else{
                    this.setState({"show":false});
                }
            })
    };

    render() {
        return (
            <div>
                <div style={{"display":this.state.show ? "block" :"none"}}>
                    <MyToast show={this.state.show} message={"삭제 성공"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"} style={{width:"1000px"}}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Book List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN Number</th>
                                <th>Price</th>
                                <th>Language</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.books.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">No Books Available.</td>
                                </tr> :
                                this.state.books.map((book =>
                                        <tr key={book.id}>
                                            <td>
                                                <Image src={book.coverPhotoURL} roundedCircle width="25" height="25"/>
                                                {book.title}
                                            </td>
                                            <td>{book.author}</td>
                                            <td>{book.isbnNumber}</td>
                                            <td>{book.price}</td>
                                            <td>{book.language}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/"+book.id} className="btn btn-sm btn-outline-primary">
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Link>
                                                    <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this,book.id)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}



