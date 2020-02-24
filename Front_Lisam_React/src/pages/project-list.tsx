import React, {FunctionComponent} from 'react';
import {useProjects} from '../hooks/projects-hook';
import ProjectCard from '../component/project-card';
import './list.css';
//import { useClient } from '../hooks/client-hook';

const List: FunctionComponent = () => {

    const projects = useProjects();
    //const client = useClient();

    return (
            <div className="col grid">
                {projects.map((P) =>
                    <ProjectCard key={P.ProjectId} project={P}/> 
                )} 
            </div>
    );


}

export default List;
