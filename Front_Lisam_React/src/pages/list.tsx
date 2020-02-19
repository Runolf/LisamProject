import React, {FunctionComponent} from 'react';
import {useProject} from '../hooks/project-hook';
import ProjectCard from '../component/project-card';
//import {Link} from 'react-router-dom';
//import ProjectService from '../services/project-service';
//import Project from '../models/project';


const List: FunctionComponent = () => {

    const projects = useProject();

    return (
        <ul>
            { projects.map((P) => (
                <ProjectCard key={P.ProjectId} project={P}/>
            )) }
        </ul>
    );




    // const projects = useProject();

    // return (
    //     <div>
    //         <h1 className="center">Lisam</h1>
    //          <div className="container">
    //           <div className="row">



    //           </div>
    //             <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
    //               style={{position: 'fixed', bottom: '25px', right: '25px'}} to="/pokemon/add">
    //             <i className="material-icons">add</i>
    //             </Link>
    //         </div>
    //     </div>
    // );

}

export default List;
