import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Switch,Route, Link} from 'react-router-dom';
import ProjectList from './pages/project-list';
import ClientList from './pages/client-list';
import pageNotFound from './pages/page-not-found';

  
const App: FunctionComponent = () => {

 return (
  <Router>
    <div>
      {/*Barre de navigation commune à toutes les pages*/}
      <nav>
        <div className="nav-wrapper">
          <div id = "nav-mobile" className="grey darken-4 center">
            <Link to="/project-list" className="nav-link">Project-List</Link>
            <Link to="/client-list" className="nav-link">Client-list</Link>
          </div>
        </div>
        
      </nav>
      {/*Gestionnaire des routes*/}
      <Switch>
        <Route exact path="/" component={ProjectList}/>
        <Route exact path="/project-list" component={ProjectList}/>
        <Route exact path="/client-list" component={ClientList}/>
        <Route component={pageNotFound}/>
      </Switch>
    </div>
  </Router>
 )
}
  
export default App;