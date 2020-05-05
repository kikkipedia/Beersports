import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './components/Navigation'
//import Home from './components/Home'
import Dice from "./components/Dice/Dice"
//import DepartureBoard from './components/Dice/DepartureBoard'


function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Dice}/>
        {/* <Route path="/Avg" component={DepartureBoard}/> */}
      </Switch>
    </Router>
  );
}

export default App;
