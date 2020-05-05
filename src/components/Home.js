import React from 'react'
import logo_white from '../logo_white.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBusAlt, faDice } from '@fortawesome/free-solid-svg-icons';

class Home extends React.Component {
    render() {
        
        return(
            
            <div>
            <div className="beersports">
                <header className="App-header">
                    <img src={logo_white} className="logo" alt="logo" />
        
                        <div class="row">
                            <div class="col-md-2">
                            <FontAwesomeIcon icon={faBusAlt} style={{color:"#5a4fe6"}}/>
                            </div>
                            <div class="col-md-8">
                            <a href="/dice" className="App-link" >Gbg dice game</a>
                            </div>
                            <div class="col-md-2">
                            <FontAwesomeIcon icon={faDice}  style={{color:"#5a4fe6"}}/>
                            </div>
                        </div>
                </header>
            </div>
            </div>
            
        )
    }
}
export default Home