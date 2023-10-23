import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Encyclopedia from './components/Encyclopedia';
import CategoryPage from './components/Category';
import PlanetsPage from './components/PlanetsPage';
import './App.css'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/Planets">
            <PlanetsPage />
          </Route>
          <Route path="/category2">
            <CategoryPage categoryName="Category 2" />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;