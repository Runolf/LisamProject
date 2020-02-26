import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Project from '../models/project';
import ProjectService from '../services/project-service';
import "./detail.css";
import { statut } from '../models/statut';

type Params = {id: string};

const ProjectDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {
    
    const [project, SetProject] = useState<Project|null>(null)

    useEffect(() => {
        ProjectService.getProject(+match.params.id)
        .then(project => SetProject(project));
        }, [match.params.id]);

        var st: string|null = (project == null)?null:statut[project.Statut];
        return (
            <div className="detail">{project? (
                <div> 
                    <div>
                    <Link to={`/project-edit/${project.ProjectId}`} className="btn right grey waves-effect waves-light">
                       <i className="material-icons">edit</i>
                    </Link>
                    </div>
                    <h1>Project: {project.ProjectNumber}</h1>
                    <p>Project leader: {project.ProjectLeader}</p>
                    <p>Signature date: {project.SignatureDate}</p> 
                    <p>Statut: {st}</p> 
                    
                </div>
                
                ):(
                    <h5>Pas de projet trouvé</h5>
                )}</div>
        );
}

export default ProjectDetail; 