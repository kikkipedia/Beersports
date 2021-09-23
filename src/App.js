import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navigation from './components/Navigation'
import Dice from "./components/Dice_old/Dice"
import Start from './components/Start'



function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Dice}/> {/* byt ut sen! */}
        </Switch>
        <Start/>
    </Router>
    </div>

  )
}

export default App;
