import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import {statut} from '../models/statut';
import  './project-card.css';

type Props = {
    project: Project
};


const projectCard: FunctionComponent<Props> = ({project}) => {
    return (
        <div className="row" >
            <div className="card-content col m2"></div>
            <div className="card-content col grey darken-2 m2 center border">Project Number: {project.ProjectNumber} </div>
            <div className="card-content col grey darken-1 m2 center border">Project leader: {project.ProjectLeader} </div>
            <div className="card-content col grey darken-1 m2 center border">Statut: {project.Statut} </div>
            <div className="card-content col grey darken-1 m2 center border">Signature Date: {project.SignatureDate} </div>
        </div>
   
    )
};

export default projectCard;
