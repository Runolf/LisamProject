import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import Client from '../models/client';
//import {statut} from '../models/statut';
import  './project-card.css';


type Props = {
    project: Project
};


const projectCard: FunctionComponent<Props> = ({project}) => {
    
    return (
        <div className="row" >
            <div className="card-content col m1"></div>
            <div className="card-content col m1"></div>
            <div className="card-content col grey darken-2 m2 center border"><span className="champ">Project Number:</span> {project.ProjectNumber} </div>
            <div className="card-content col grey darken-1 m2 center border"><span className="champ">Project Leader:</span> {project.ProjectLeader} </div>
            <div className="card-content col grey darken-1 m2 center border"><span className="champ">Statut: </span> {project.Statut} </div>
            <div className="card-content col grey darken-1 m2 center border"><span className="champ">Signature Date:</span> {project.SignatureDate} </div>
            <div className="card-content col m1"></div>
        </div>
   
    )
};

export default projectCard;
