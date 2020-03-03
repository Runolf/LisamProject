import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import  './card.css';
import Client from '../models/client';


type Props = {
    project: Project,
    client: Client
};




const ProjectCard: FunctionComponent<Props> = ({project, client}) => {
   
    return (
        <tr className="" style={{color: "white"}}>
            <td className="grey darken-2 m2 center border">{project.ProjectNumber} </td>
            <td className="grey darken-2 m2 center border">{project.ProjectLeader} </td>
            {/* {client? 
            <td className="grey darken-2 m2 center border">{client.Email} </td>
            :
            <td className="grey darken-2 m2 center border">pas de client... </td>
             } */}
            
        </tr>
   
    )
};

export default ProjectCard;
