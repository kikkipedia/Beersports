import React from 'react'
//import moment from 'moment'
import 'moment/locale/de'
import { Table } from 'react-bootstrap'
import '../../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'


class DepartureBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isloaded: false,
            departures: [],
        };
    }   

    componentDidMount() {
        this.update()
    }

    update = () => {
        fetch("https://api.resrobot.se/v2/departureBoard?key=2a14c983-ad0d-4aba-964f-7b5fa88121b5&id="+this.props.hpl+"&products=64&passlist=0&maxJourneys=40&format=json")
        .then(res => res.json())
        .then((result) => {
            //var currentTime = moment().locale('de-DE').format('LTS')
            this.setState({
                error: null,
                isloaded: false,
                departures: result.Departure
            })
        },(error) => {
            this.setState({
                isLoaded: true,
                error
            })
        })
    }

    render() {
        
        return (
            <div>
                <p>Departures {this.props.startPos}</p>

                <FontAwesomeIcon icon={faSyncAlt} onClick={this.update} style={{color:'#00FF7F'}} size='1x'/> update

                <Table className="board" size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Direction</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.departures.map(departure => {
                            if (departure.transportNumber === this.props.tramDice) {
                                return(
                                    <tr>
                                        <td>{departure.transportNumber}</td>
                                        <td>{departure.direction}</td>
                                        <td>{departure.time}</td>
                                    </tr>
                                )
                            }                           
                        })}
                    </tbody>
                </Table>
            </div>          
        )
    }
}



export default DepartureBoard