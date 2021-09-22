import React from 'react'
import '../../index.css'
import $ from 'jquery'
import DepartureBoard from './DepartureBoard'
import { InputGroup, FormControl, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice, faSearch, faArrowCircleUp, faArrowCircleDown, faBusAlt } from '@fortawesome/free-solid-svg-icons'

class Dice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tramDice: undefined,
            startPos: 'Brunnsparken',
            hplId: '740020752',
            stopsDice: undefined,
            nextStop: undefined,
            nextTram: undefined,
            input: '',
            hplDepartures: [],
            endHpl: '',
            loaded: false
        }
      }

    // SEARCH HPL
    handleChange = event => {
        this.setState({input: event.target.value})
    }
    setHpl = async () => {
        await this.setState({startPos: this.state.input})
        this.getHplId()
    }

    // HPL-INFO
    getHplId = () => {
        fetch("https://api.resrobot.se/v2/location.name?key=17764716-b110-479b-923c-047792e2f33d&input="+this.state.startPos+"&format=json")
        .then(res => res.json())
        .then((result) => {
            var object = result.StopLocation.find(function(member) {
                return member.products === 192 || 64               
            })
            var hpl = object.name
            this.setState({hplId: object.id})
            this.setState({startPos: hpl})
            console.log(object.id)
        },(error) => {
            if (error) {
              alert('something went very wrong!')
            }
          })
    }

    getHplInfo = () => {
        fetch("https://api.resrobot.se/v2/departureBoard?key=2a14c983-ad0d-4aba-964f-7b5fa88121b5&id="+this.state.hplId+"&products=64&maxJourneys=30&format=json")
        .then(res => res.json())
        .then((result) => {
            var hplArr = []
            for (var i = 0; i <result.Departure.length; i++) {                
                var trams = result.Departure[i].Product.num
                hplArr.push(trams)   
            }            
            var departures = [...new Set(hplArr)]
            this.setState({hplDepartures: departures})
            console.log(departures)
        })
    }

    // rolls dice and check departures
    rollDiceTram = () => {
        fetch("https://api.resrobot.se/v2/departureBoard?key=2a14c983-ad0d-4aba-964f-7b5fa88121b5&id="+this.state.hplId+"&products=64&maxJourneys=30&format=json")
        .then(res => res.json())
        .then((result) => {
            this.setState({loaded: true})
            var hplArr = []
            for (var i = 0; i <result.Departure.length; i++) {                
                var trams = result.Departure[i].Product.num
                hplArr.push(trams)   
            }            
            var departures = [...new Set(hplArr)]
            console.log(departures)
            // throw dice
            var tramDice =  (1 + Math.floor(Math.random()*13)).toString()
            if(hplArr.includes(tramDice)){
                this.setState({
                    tramDice: tramDice,
                    loaded: false
                    })
                $(".step3").css("display", "block")
                $(".step2").css("display", "none")
            }
            else {
                alert("it crashed! reload!")
            }
        })
        // ERROR HANDLING
        
    }

    rollStops = () => {
        var stopsDice = 1 + Math.floor(Math.random()*8)
        this.setState({stopsDice: stopsDice})
        $(".step5").css("display", "block")
    }

    getNextStop = () => {
        fetch("https://api.resrobot.se/v2/departureBoard?key=2a14c983-ad0d-4aba-964f-7b5fa88121b5&id="+this.state.hplId+"&products=64&maxJourneys=30&format=json")
        .then(res => res.json())
        .then((result) => {
            var tram = this.state.tramDice
                //matcha med Departure[].Product.num
                var obj = result.Departure
                var matchingTrams = []
                for (var i = 0; i < obj.length; i++){
                    // look for the entries with matching value
                    if (obj[i].Product.num === tram){
                        matchingTrams = obj[i]
                        console.log(matchingTrams)                        
                    }
                }
                // randomize direction (yet not working) just takes the last one
                var end = matchingTrams.direction //randomise this
                var endHpl1 = end.replace('Göteborg', '')
                var endHpl2 = endHpl1.replace('kn', '')
                var endHpl3 = endHpl2.replace('(', '')
                var endHpl4 = endHpl3.replace(')', '')
                this.setState({endHpl: endHpl4})
                // rolls stops
                var stopsDice = 1 + Math.floor(Math.random()*8)
                this.setState({stopsDice: stopsDice})
                $(".step4").css("display", "block")
                $('.step3').css("display", "none")
                // hitta hpl i stop-array
                var stopArr = matchingTrams.Stops.Stop
                console.log(stopArr)
                var stops = stopArr[stopsDice] 
                //check if in range
                if(stopsDice < stopArr.length) {
                    var hpl = stops.name
                    var replace1 = hpl.replace('Göteborg', '')
                    var replace2 = replace1.replace('kn', '')
                    var replace3 = replace2.replace('(', '')
                    var replace4 = replace3.replace(')', '')
                    var stop = replace4
                    this.setState({
                        nextStop: stop,
                        startPos: stop,
                        hplId: stops.id
                    })
                }
                else {
                    console.log("out of reach") // roll stops  again
                    this.getNextStop()
                }
                
        })
    }

    step2 = () => {
        $('.step2').css("display", "block")
        $('.step1').css("display", "none")
    }
    step5 = () => {
        $('.step5').css("display", "block")
        $('.step4').css("display", "none")
    }
    step6 = () => {
        $('.step6').css("display", "block")
        $('.step5').css("display", "none")
    }

    startOver = () => {
        $('.step6').css("display", "none")
        $('.step1').css("display", "block")
        $('.search').css("display", "none")
    }
    show = () => {
        $('.departureboard').css("display", "block")
    }
    hide = () => {
        $('.departureboard').css("display", "none")
    }
    
    render() {
        
        return (
            <div className="content">
                
                <div className="step1" style={{display:'block'}}>
                    <p>Start at <span id="pink">{this.state.startPos}</span></p>
                    <div className="search" style={{display:'block'}}>
                        <p>or search your station</p>
                        <InputGroup size="sm" className="col-md-6">
                        <FormControl placeholder="Search station" value={this.state.input} onChange={this.handleChange}/>
                        <InputGroup.Append>
                            <InputGroup.Text><FontAwesomeIcon icon={faSearch} style={{color: 'black'}} onClick={this.setHpl}/></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                    <br/>
                    <Button variant="outline-success" onClick={this.step2}>Continue</Button>
                    {/* <FontAwesomeIcon icon={faCheckCircle} onClick={this.step2} style={{color: '#00FF7F'}} size='2x'/> */}
                    <br/><br/>
                </div>

                <div className="step2" style={{display:'none'}}>
                    <p>Drink your <img src="https://img.icons8.com/plasticine/100/000000/beer.png" width="50px" alt="beer"/> at</p><p><span id="pink">{this.state.startPos}</span> and</p>
                    {this.state.loaded ? <Spinner animation="border" variant="info" /> : <button className="dice" onClick={this.rollDiceTram}><FontAwesomeIcon icon={faDice} style={{color:"#bf53e0"}} size='2x'/></button> } 
                    <p>r o l l</p> 
                </div>

                <div className="step3" style={{display:'none'}}>
                    <p>Finish the <img src="https://img.icons8.com/plasticine/100/000000/beer.png" width="50px" alt="beer"/> and take tram # <span id="pink">{this.state.tramDice}</span></p>
                    <button className="dice" onClick={this.getNextStop}><FontAwesomeIcon icon={faDice} style={{color:"#bf53e0"}} size='2x'/></button>
                    <p>r o l l</p>
                </div>

                <div className="step4" style={{display:'none'}}>
                    <p>You are going in direction</p><p><span id="pink">{this.state.endHpl}</span></p>
                    <button className="dice" onClick={this.step5}><FontAwesomeIcon icon={faDice} style={{color:"#bf53e0"}} size='2x'/></button>
                    <p>r o l l</p>
                </div>

                <div className="step5" style={{display:'none'}}>
                    <p>Travel <span id="pink">{this.state.stopsDice}</span> stops.</p>
                    <p><button className="dice" onClick={this.step6}><FontAwesomeIcon icon={faDice} style={{color:"#bf53e0"}} size='2x'/></button></p>
                    <p>r o l l</p>
                </div>
                <div className="step6" style={{display:'none'}}>
                    <p>Take the tram to: <span id="pink">{this.state.nextStop}</span></p> 
                    <p>and find a pub!</p>   
                    <p>When you are drinking <img src="https://img.icons8.com/plasticine/100/000000/beer.png" width="50px" alt="beer"/> at {this.state.nextStop}</p>
                    <button className="dice" onClick={this.startOver}><FontAwesomeIcon icon={faDice} style={{color:"#bf53e0"}} size='2x'/></button> 
                    <p>roll to plan next stop</p>
                </div>

                <div className="departure">
                    <hr/>
                    <FontAwesomeIcon icon={faArrowCircleDown} style={{color: '#00FF7F'}} size='2x'className="mr-3" onClick={this.show}/>
                    <FontAwesomeIcon icon={faBusAlt} style={{color:"#bf53e0"}} size='1x'className="mr-3"/>
                    <FontAwesomeIcon icon={faArrowCircleUp} style={{color: '#00FF7F'}} size='2x'className="mr-3" onClick={this.hide}/>
                    <p>Hide/show departure board</p>
                    <hr/>
                    <div className="departureboard" style={{display:'none'}}>
                        <DepartureBoard hpl={this.state.hplId} tramDice={this.state.tramDice} startPos={this.state.startPos}/>
                    </div>
                </div>
                {/* <div className="footer">
                <img src="logo_white.PNG" className="resize" alt="logo"/>
                </div> */}
            </div>
            
        )
    }
}
export default Dice