import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import Client from '../models/client';
import  './card.css';
import { statut } from '../models/statut';
import { useHistory } from 'react-router-dom';
import ClientService from '../services/client-services';
import ProjectService from '../services/project-service';

type Props = {
    project: Project,
    client: Client
};

const BothCard: FunctionComponent<Props> = ({project,client}) => {
    var st: string = statut[project.Statut];
    const history = useHistory();

    const goToClient = (id:number) => {
        history.push(`/Client/${id}`);
     }

     const goToProject = (id:number) => {
         history.push(`/Project/${id}`);
     }

    const deleteClient = () =>  {
        ClientService.deleteClient(client)
        .then(() => history.push(`/both`));
      }

      const deleteProject = () => {
        ProjectService.deleteProject(project)
        .then(() => history.push(`/both`));
    }

    return (
        //Nom Client | Numero projet | Date Sign | Project Leader |	Statut | Detail/edit/delete

        <tr className="" style={{color: "white"}}>
            {client?
            <td className="grey darken-2 m2 center border" onClick={() => goToClient(client.ClientId)}>{client.Company_Name} </td>
            : 
            <td className="grey darken-2 m2 center border">No client assigned to this project</td>
            }
            
            
            
            <td className="grey darken-2 m2 center border" onClick={() => goToProject(project.ProjectId)}>{project.ProjectNumber}</td>
            <td className="grey darken-2 m2 center border">{project.SignatureDate.toString()
                                                                                                                                                  .slice(0, 10)
                                                                                                                                                  .split('-')
                                                                                                                                                  .join("/")}</td>
            <td className="grey darken-2 m2 center border">{project?
            (project.ProjectLeader):(<p>no project</p>)
            }</td>
            <td className="grey darken-2 m2 center border">{st}</td>
            <td className="m2 td-button-list">

                {project?
                <tr  className="button-list btn green darken-4" onClick={() => goToProject(project.ProjectId)}>Detail project</tr>
                :
                <tr  className="button-list btn grey darken-4">Detail project</tr>
                }
                
                {client?
                <tr  className="button-list btn green darken-4" onClick={() => goToClient(client.ClientId)}>Detail client</tr>
                :
                <tr  className="button-list btn grey darken-4">Detail client</tr>
                }
                
            </td>
            <td className="m2 td-button-list">

            {project?
                <tr  className="button-list btn red darken-4" onClick={() => deleteProject()}>Delete project</tr>
                :
                <tr  className="button-list btn grey darken-4">Delete project</tr>
                }
                
                {client?
                <tr  className="button-list btn red darken-4" onClick={() => deleteClient()}>Delete client</tr>
                :
                <tr  className="button-list btn grey darken-4">Delete client</tr>
                }
               
            </td>

        </tr>

    )

}

export default BothCard;
