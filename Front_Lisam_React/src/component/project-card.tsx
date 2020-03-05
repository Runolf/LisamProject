import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import  './card.css';
import Client from '../models/client';
import { useHistory } from 'react-router-dom';


type Props = {
    project: Project,
    client: Client
};




const ProjectCard: FunctionComponent<Props> = ({project, client}) => {
   
    const history = useHistory();

    const goToModifyProject = (id: number) => {
        history.push(`/project-edit/${id}`);
    }

    

    return (
        <tr className="" style={{color: "white"}}>
            <td className="grey darken-2 m2 center border">{project.ProjectNumber}
            <tr  className="button-list btn blue-grey darken-2 waves-effect waves-teal z-depth-3 left" onClick={() => goToModifyProject(project.ProjectId)}>Modif</tr>
            </td>
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
