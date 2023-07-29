
import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Edit from './components/Edit';
import New from './components/New';

import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render  = {props => (<Login{...props}/>)}></Route>
          <Route path="/dashboard" exact render  = {props => (<Dashboard{...props}/>)}></Route>
          <Route path="/new" exact render  = {props => (<New{...props}/>)}></Route>
          <Route path="/edit" exact render  = {props => (<Edit{...props}/>)}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
