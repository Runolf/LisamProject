import React, {FunctionComponent} from 'react';
import Project from '../models/project';
//import FormatDate from '../helpers/format-date';
import {statut} from '../models/statut';
import  './project-card.css';
import { useHistory } from 'react-router-dom';


type Props = {
    project: Project
};



const ProjectCard: FunctionComponent<Props> = ({project}) => {

    const history = useHistory();
    
    const goToProject = (id:number) => {
        history.push(`/Project/${id}`);
    }
    
    var st: string = statut[project.Statut];

    return (
        <tr className="" style={{color: "white"}} onClick={() => goToProject(project.ProjectId)} >
            <td className="grey darken-2 m2 center border">{project.ProjectNumber} </td>
            <td className="grey darken-2 m2 center border">{project.ProjectLeader} </td>
        </tr>
   
    )
};

export default ProjectCard;
