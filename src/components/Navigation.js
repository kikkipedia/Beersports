import React from 'react'
import { Navbar} from 'react-bootstrap'

const Navigation = () => {

        return (
            
            <div>                
                <Navbar collapseOnSelect expand="lg" className="navbar mr-auto" sticky="top">
                    <Navbar.Brand href="/" className="navbrand" style={{color:"#ffcc00"}}>B E E R S P O R T S <span style={{fontSize:"x-small", color:"#ffcc00", verticalAlign:"middle"
                , letterSpacing:"2px"}}>- harder than fitness</span></Navbar.Brand>
                </Navbar>
            </div>
        )
    }
export default Navigation