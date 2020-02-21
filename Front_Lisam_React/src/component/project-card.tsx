import React, {FunctionComponent} from 'react';
import Project from '../models/project';
//import FormatDate from '../helpers/format-date';
import {statut} from '../models/statut';
import  './project-card.css';


type Props = {
    project: Project
};



const projectCard: FunctionComponent<Props> = ({project}) => {
    
    var st: string = statut[project.Statut];

    return (
        <div className="row" >
            <div className="card-content col m1"></div>
            <div className="card-content col m1"></div>
            <div className="card-content col grey darken-2 m2 center border"><span className="champ">Project Number:</span> {project.ProjectNumber} </div>
            <div className="card-content col grey darken-1 m2 center border"><span className="champ">Project Leader:</span> {project.ProjectLeader} </div>
            <div className="card-content col grey darken-1 m2 center border"><span className="champ">Statut: </span> {st} </div>
            <div className="card-content col grey darken-1 m2 center border"><span className="champ">Signature Date:</span> {project.SignatureDate.toString()
                                                                                                                                                  .slice(0, 10)
                                                                                                                                                  .split('-')
                                                                                                                                                  .join("/")} </div>
            <div className="card-content col m1"></div>
        </div>
   
    )
};

export default projectCard;
