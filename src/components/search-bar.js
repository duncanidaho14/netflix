import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {searchText: "", placeholder: "Tapez le nom de votre film ..." }
    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Acceuil</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Acceuil</Nav.Link>
                        <Nav.Link href="#features">Video</Nav.Link>
                        <Nav.Link href="#pricing">A l'affiche</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" className="mr-sm-2" onKeyUp={this.handleChange.bind(this)} placeholder={this.state.placeHolder} />
                        <Button onClick={this.handleOnClick.bind(this)} variant="outline-light">Chercher</Button>
                    </Form>
                </Navbar>           
            </div>
        )    
    }

    handleChange(event) {
        this.setState({searchText: event.target.value});
    }

    handleOnClick(event) {
        this.props.callback(this.state.searchText)
    }
}

export default SearchBar;