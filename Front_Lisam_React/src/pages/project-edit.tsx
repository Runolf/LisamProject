import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProjectForm from '../component/project-form';
import Project from '../models/project';
import ProjectServices from '../services/project-service';
import '../pages/detail.css';

type Params = { id: string };



const ProjectEdit: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        ProjectServices.getProject(+match.params.id)
        .then(project => setProject(project));
    }, [match.params.id]);
    
    return (
        <div className="detail">
            {project? (
                    <div className="row">
                     <ProjectForm project={project} client={project.Client} isEditForm={true}></ProjectForm>
                </div>
            ) : (
                <h4 className="center">Aucun projet à afficher !</h4>
             )}
        </div>
    )

}

export default ProjectEdit;