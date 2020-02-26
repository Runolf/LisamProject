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
        <tr className="" style={{color: "white"}} >
            
            <td className="grey darken-2 m2 center border">{project.ProjectNumber} </td>
            <td className="grey darken-2 m2 center border">{project.ProjectLeader} </td>
            <td className="grey darken-2 m2 center border">{st} </td>
            <td className="grey darken-2 m2 center border">{project.SignatureDate.toString()
                                                                                                 .slice(0, 10)
                                                                                                 .split('-')
                                                                                                 .join("/")} </td>
            
        </tr>
   
    )
};

export default projectCard;
