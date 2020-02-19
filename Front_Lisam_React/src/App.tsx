import React, {FunctionComponent, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch,Route, Link} from 'react-router-dom';
import pageNotFound from './pages/page-not-found';

  
const App: FunctionComponent = () => {

 return (
  <Router>
    <div>
      {/*Barre de navigation commune à toutes les pages*/}
      <nav>
        <div className="nav-wrapper teal">
          <Link to="/" className="brand-logo center">Home</Link>
        </div>
      </nav>
      {/*Gestionnaire des routes*/}
      <Switch>
        <Route component={pageNotFound}/>
      </Switch>
    </div>
  </Router>
 )
}
  
export default App;