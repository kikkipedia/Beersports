import React from 'react'
import { Navbar} from 'react-bootstrap'
import "../index.css"
import beericon from '../images/beericon.png'


const Navigation = () => {

        return (
            
            <div>
                
                <Navbar collapseOnSelect expand="lg" className="navbar mr-auto" sticky="top">
                    <Navbar.Brand href="/" className="navbrand" style={{color:"#ffcc00"}}>B E E R S P O R T S <img src={beericon} width="40px" alt="beer"/></Navbar.Brand>
                </Navbar>
            </div>
        )
    }
export default Navigation