import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './pageNotFound.css';
  
const PageNotFound: FunctionComponent = () => {
  
  return (
    <div className="center">
      <h1 className="pageNotFound">Page not found</h1> <br/>
      <Link to="/" className="waves-effect waves-teal btn-flat">
        Home
      </Link>
    </div>
  );
}
  
export default PageNotFound;