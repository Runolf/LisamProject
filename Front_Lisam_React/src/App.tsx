import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Switch,Route, Link} from 'react-router-dom';
import ProjectList from './pages/project-list';
import ClientList from './pages/client-list';
import ClientDetail from '../src/pages/client-detail';
import pageNotFound from './pages/page-not-found';
import { BothList } from './pages/bothlist';
import ClientEdit from './pages/client-edit';
import ClientAdd from './pages/client-add';

  
const App: FunctionComponent = () => {

 return (
  <Router>
    <div>
      {/*Barre de navigation commune à toutes les pages*/}
      <nav>
        <div className="nav-wrapper">
          <div id = "nav-mobile" className="grey darken-4 center">
            <Link to="/project" className="nav-link">Project-List</Link>
            <Link to="/client" className="nav-link">Client-list</Link>
          </div>
        </div>
        
      </nav>
      {/*Gestionnaire des routes*/}
      <Switch>
        <Route exact path="/" component={ProjectList}/>
        <Route exact path="/project" component={ProjectList}/>
        <Route exact path="/client" component={ClientList}/>
        <Route exact path="/both" component={BothList}/>
        <Route exact path="/client-add/" component={ClientAdd}/>
        <Route exact path="/client-edit/:id" component={ClientEdit}/>
        <Route exact path="/client/:id" component={ClientDetail}/>
        <Route exact path="/client-edit/" component={pageNotFound}/>
        <Route component={pageNotFound}/>
      </Switch>
    </div>
  </Router>
 )
}
  
export default App;