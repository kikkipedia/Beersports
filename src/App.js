import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navigation from './components/Navigation'
import Dice from "./components/Dice_old/Dice"
import Start from './components/Start'
import Game from './components/Game';


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Dice}/> {/* byt ut sen! */}
          <Route path="/game" component={Game}/>
        </Switch>
        <Start/>
    </Router>
    </div>

  )
}

export default App;
