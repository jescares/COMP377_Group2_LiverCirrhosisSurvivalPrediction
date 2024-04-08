import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FormPage from './components/FormPage';
import PredictionPage from './components/PredictionPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/form" component={FormPage} />
        <Route path="/prediction" component={PredictionPage} />
      </Switch>
    </Router>
  );
}

export default App;
