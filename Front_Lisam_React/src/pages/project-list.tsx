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
                <table className="container responsive-table centered ">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th>Project number</th>
                            <th>Project leader</th>
                            <th>Statut</th>
                            <th>Date signature</th>
                        </tr>
                     </thead>
                     <tbody className="row grid">
                    {projects.map((P) =>
                        <ProjectCard key={P.ProjectId} project={P}/> 
                    )} 
                    </tbody>
                </table>
            </div>
    );


}

export default List;
