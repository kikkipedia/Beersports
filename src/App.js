import React from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navigation from './components/Navigation'
import Start from './components/Start'
import Game from './components/Game';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Start}/>
          <Route path="/game" component={Game}/>
        </Switch>
    </Router>
    <Footer/>
    </div>

  )
}

export default App;
