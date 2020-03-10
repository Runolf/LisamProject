import React, {FunctionComponent} from 'react';
import {useProjects} from '../hooks/projects-hook';
import ProjectCard from '../component/project-card';
import './list.css';
//import { useClient } from '../hooks/client-hook';


const List: FunctionComponent = () => {

    const projects = useProjects();
    //const client = useClient();
   

    return (
            <div>
              <table className="container centered ">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th>Project number</th>
                            <th>Project leader</th>
                        </tr>
                     </thead>
                     <tbody className="row grid">
                    {projects.map((P) =>
                    P.IsActive === true?
                        <ProjectCard key={P.ProjectId} client={P.Client} project={P}/> 
                        : ""
                    )} 
                    </tbody>
                </table>
            </div>
    );


}

export default List;
