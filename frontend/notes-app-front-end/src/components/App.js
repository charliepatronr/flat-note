import React from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Notes from './Notes';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


const App = () => {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar title="Notes App" description="Flatiron School" />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/notes' component ={Notes} />
          </Switch>
        </div>
      </BrowserRouter>
    );


};

export default App;