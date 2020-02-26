import React, { FunctionComponent, useState} from 'react';
import ProjectForm from '../component/project-form';
import Project from '../models/project';

const ProjectAdd:FunctionComponent = () => {

    const [project] = useState<Project>(new Project());

    return ( 
        <div className="row">
            <h2 className="header center">Ajouter un project </h2>
                <ProjectForm project={project} isEditForm={false}></ProjectForm>
        </div>
    );
}

export default ProjectAdd;
