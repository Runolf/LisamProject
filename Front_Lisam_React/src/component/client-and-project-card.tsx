import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import Client from '../models/client';
import  './project-card.css';

type Props = {
    project: Project,
    client: Client
};

const bothCard: FunctionComponent<Props> = ({project,client}) => {
    return (
        <div className="row" >
            <div className="card-content col m1"></div>
            <div className="card-content col grey darken-2 m2 center border">Client Name: {client.Company_Name} </div>
            <div className="card-content col grey darken-2 m2 center border">Project number: {project.ProjectLeader}</div>
        </div>

    )

} 

export default bothCard;