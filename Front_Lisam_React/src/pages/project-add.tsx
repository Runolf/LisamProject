import React, { FunctionComponent, useState} from 'react';
import ProjectForm from '../component/project-form';
import Project from '../models/project';

const ProjectAdd:FunctionComponent = () => {

    const [project] = useState<Project>(new Project());

    return ( 
        <div>
            {
                project !== undefined?
                <div className="row">
                    <ProjectForm project={project} client={project.Client} isEditForm={false}></ProjectForm>
                </div>
                :
                <p>
                    no projects found!
                </p>
            }
        </div>
    );
}

export default ProjectAdd;
