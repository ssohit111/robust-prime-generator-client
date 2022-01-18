import React from 'react'
import '../App.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
    const mystyle = {
        textDecoration: "none",
        color: "white",
        paddingLeft: "100px",
        paddingRight: "100px",
    }
    return (
        <div className='makesticky'>
            <Navbar bg="dark" variant='dark' expand="lg" >
                <Container>
                    <Navbar.Brand >Midaas Telesoft</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto ">
                            <Link to='/' style={mystyle}>Home</Link>
                            <Link to='/primegenerator' style={mystyle}>Prime Generator</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header