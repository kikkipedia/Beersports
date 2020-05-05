import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import "../index.css"


class Navigation extends React.Component {


    render() {
        return (
            
            <div>
                
                <Navbar collapseOnSelect expand="lg" className="navbar mr-auto" sticky="top">
                    <Navbar.Brand className="navbrand" style={{color:"#ffcc00"}}>B E E R S P O R T S</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="">Nothing here yet!</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>
            </div>
        )
    }
}
export default Navigation