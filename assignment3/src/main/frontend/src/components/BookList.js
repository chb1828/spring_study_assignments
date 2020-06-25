import React, {Component} from "react";
import {Button, ButtonGroup, Card, FormControl, Image, InputGroup, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faFastBackward,
    faFastForward,
    faList, faSearch,
    faStepBackward,
    faStepForward, faTimes,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from "./MyToast";
import {Link} from "react-router-dom";
import AuthService from "../services/auth-service";
import './Style.css';

export default class BookList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            search: '',
            token: "",
            currentPage:1,
            booksPerPage: 10,
            sortToggle: false
        };
    }

    sortData = () => {
        this.setState({
            sortToggle: !this.state.sortToggle
        },() =>{
            this.findAllBooks(this.state.currentPage);
        });
    };

    componentDidMount() {
        this.findAllBooks(this.state.currentPage);
        this.setState({token:AuthService.getCurrentUser()})
    }

    findAllBooks(currentPage) {
        currentPage -= 1;
        let sortDir = this.state.sortToggle ? "asc" : "desc";
        axios.get("http://localhost:8080/books?pageNumber="+currentPage+"&pageSize="+this.state.booksPerPage+"&sortBy=price&sortDir="+sortDir+"&search="+this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    books:data.content,
                    totalPages: data.totalPages,
                    totalElements:data.totalElements,
                    currentPage: data.number + 1
                })
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

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.findAllBooks(targetPage);
        this.setState({
            [event.target.name]:targetPage
        })
    };


    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage){
            this.findAllBooks(firstPage);
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage){
            this.findAllBooks(this.state.currentPage - prevPage);
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.booksPerPage)){
            this.findAllBooks(this.state.currentPage + 1);
            console.log(this.state.sortToggle);
        }
    };

    lastPage = () => {
        let condition =  Math.ceil(this.state.totalElements / this.state.booksPerPage);
        if(this.state.currentPage < condition){
            this.findAllBooks(condition);
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({
            search:''
        });
    };

    startSearch = () => {
        this.findAllBooks(this.state.currentPage);
    }


    render() {
        const {books, currentPage, totalPages, search} = this.state;  //booksPerPage = 한 페이지에 보여질 개수

        return (
            <div>
                <div style={{"display":this.state.show ? "block" :"none"}}>
                    <MyToast show={this.state.show} message={"삭제 성공"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"} style={{width:"1000px"}}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList}/> Book List
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                             className={"info-border bg-dark text-white"}
                                            onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.startSearch}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN Number</th>
                                <th onClick={this.sortData}>Price <div className={this.state.sortToggle ? "arrow arrow-down" : "arrow arrow-up"}></div></th>
                                <th>Language</th>
                                <th>Genre</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">No Books Available.</td>
                                </tr> :
                               books.map((book =>
                                        <tr key={book.id}>
                                            <td>
                                                <Link to={"read/"+book.id} className="btn btn-sm" style={{ textDecoration: 'none',color:'skyblue' }}>
                                                    <Image src={book.coverPhotoURL} roundedCircle width="25" height="25"/>
                                                    {book.title}
                                                </Link>
                                            </td>
                                            <td>{book.author}</td>
                                            <td>{book.isbnNumber}</td>
                                            <td>{book.price}</td>
                                            <td>{book.language}</td>
                                            <td>{book.genre}</td>
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
                    {books.length > 0 ?
                    <Card.Footer>
                        <div style={{"float":"left"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward}/> First
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward}/> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                             onChange={this.changePage} disabled/>
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward}/> Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                        <FontAwesomeIcon icon={faFastForward}/> Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer> : null
                    }
                </Card>
            </div>

        );
    }
}



