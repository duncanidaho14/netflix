import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            searchText: "", 
            placeholder: "Tapez le nom de votre film ...", 
            intervalBeforeRequest: 1000, 
            lockRequest: false
        }
    }
    render() {
        return (
            <div>
                <Navbar  expand="lg" bg="primary" variant="dark">
                    <Navbar.Brand href="#">Accueil</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Form inline>
                        <FormControl type="text" className="mr-sm-2" onKeyUp={this.handleChange.bind(this)} placeholder={this.state.placeHolder} />
                        <Button onClick={this.handleOnClick.bind(this)} variant="outline-light">Chercher</Button>
                    </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

    handleChange(event) {
        this.setState({searchText: event.target.value});
        if(!this.state.lockRequest) {
            this.setState({lockRequest: true})
            setTimeout(function() {this.search()}.bind(this), this.state.intervalBeforeRequest)
        }
    }

    handleOnClick() {
        this.search();
    }
    search() {
        this.props.callback(this.state.searchText)
        this.setState({lockRequest: false})
    }
}

export default SearchBar;