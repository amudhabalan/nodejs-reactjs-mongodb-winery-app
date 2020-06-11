import React from 'react';
import './App.css';
import WineList from './components/WineList';
import WineDetails from './components/WineDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Route exact path="/" component={WineList} />
        <Route exact path="/wine/:id" component={WineDetails} />
      </div>
    </Router>
  );
}

export default App;
