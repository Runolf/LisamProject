import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import Client from '../models/client';
import  './card.css';
import { statut } from '../models/statut';
import { useHistory } from 'react-router-dom';
import ClientService from '../services/client-services';
import ProjectService from '../services/project-service';
import formatDate from '../helpers/format-date';
//import Actions from '../helpers/actions';

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
        .then(() => window.location.reload());
      }

      const deleteProject = () => {
        ProjectService.deleteProject(project)
        .then(() => window.location.reload());

    }

    const goToModifyProject = (id: number) => {
        history.push(`/project-edit/${id}`);
    }

    const goToModifyClient = (id: number) => {
        history.push(`/client-edit/${id}`);
    }
    
    var date; // obliged to do this code below, otherwise the formatDate doesn't work
    if (project !== null) {
     date = new Date(project.SignatureDate);
    }

    return (
                <tr className="" style={{color: "white"}}>
                    {client?
                    <td className="grey darken-2 m2 center border">{client.Company_Name} <br/>
                    <div  className="button-list btn blue-grey darken-3 waves-effect waves-teal z-depth-3" onClick={() => goToClient(client.ClientId)}>Detail</div>
                    <div  className="button-list btn blue-grey darken-2 waves-effect waves-teal z-depth-3" onClick={() => goToModifyClient(client.ClientId)}>Modif</div>
                    <div  className="button-list btn blue-grey darken-1 waves-effect waves-teal z-depth-3" onClick={() => deleteClient()}>Delete</div>
                    </td>
                    :
                    <td className="grey darken-2 m2 center border">No client assigned to this project</td>
                    }

                    <td className="grey darken-2 m2 center border">{project.ProjectNumber}<br/>
                    <div  className="button-list btn blue-grey darken-3 waves-effect waves-teal z-depth-3" onClick={() => goToProject(project.ProjectId)}>Detail</div>
                    <div  className="button-list btn blue-grey darken-2 waves-effect waves-teal z-depth-3" onClick={() => goToModifyProject(project.ProjectId)}>Modif</div>
                    <div  className="button-list btn blue-grey darken-1 waves-effect waves-teal z-depth-3" onClick={() => deleteProject()}>Delete</div>

                    </td>
                    <td className="grey darken-2 m2 center border">{formatDate(date)}</td>
                    <td className="grey darken-2 m2 center border">{project?
                    (project.ProjectLeader):(<p>no project</p>)
                    }</td>
                    <td className="grey darken-2 m2 center border">{st}</td>
                </tr>
    )

}

export default BothCard;
