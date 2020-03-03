import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import Client from '../models/client';
import  './card.css';
import { statut } from '../models/statut';
import { useHistory } from 'react-router-dom';
import ClientService from '../services/client-services';
import ProjectService from '../services/project-service';
import formatDate from '../helpers/format-date';

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

    var date;
    if (project !== null) {
     date = new Date(project.SignatureDate);
    }

    return (
        //Nom Client | Numero projet | Date Sign | Project Leader |	Statut | Detail/edit/delete

        <tr className="" style={{color: "white"}}>
            {client?
            <td className="grey darken-2 m2 center border">{client.Company_Name} <br/>
             <tr  className="button-list btn blue-grey darken-3 waves-effect waves-teal z-depth-3" onClick={() => goToClient(client.ClientId)}>Detail</tr>
             <tr  className="button-list btn blue-grey darken-2 waves-effect waves-teal z-depth-3" onClick={() => goToModifyClient(client.ClientId)}>Modif</tr>
             <tr  className="button-list btn blue-grey darken-1 waves-effect waves-teal z-depth-3" onClick={() => deleteClient()}>Delete</tr>
            </td>
            :
            <td className="grey darken-2 m2 center border">No client assigned to this project</td>
            }

            <td className="grey darken-2 m2 center border">{project.ProjectNumber}<br/>
            <tr  className="button-list btn blue-grey darken-3 waves-effect waves-teal z-depth-3" onClick={() => goToProject(project.ProjectId)}>Detail</tr>
            <tr  className="button-list btn blue-grey darken-2 waves-effect waves-teal z-depth-3" onClick={() => goToModifyProject(project.ProjectId)}>Modif</tr>
            <tr  className="button-list btn blue-grey darken-1 waves-effect waves-teal z-depth-3" onClick={() => deleteProject()}>Delete</tr>

            </td>
            <td className="grey darken-2 m2 center border">{formatDate(date)}</td>
            <td className="grey darken-2 m2 center border">{project?
            (project.ProjectLeader):(<p>no project</p>)
            }</td>
            <td className="grey darken-2 m2 center border">{st}</td>


            {/* <td className="m2 td-button-list">

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

            </td> */}

            {/* <td className="m2 td-button-list">

                {project?
                <tr  className="button-list btn blue darken-4" onClick={() => goToModifyProject(project.ProjectId)}>Modif project</tr>
                :
                <tr  className="button-list btn grey darken-4">modif project</tr>
                }

                {client?
                <tr  className="button-list btn blue darken-4" onClick={() => goToModifyClient(client.ClientId)}>Modif client</tr>
                :
                <tr  className="button-list btn grey darken-4">modifs client</tr>
                }

            </td> */}



            {/* <td className="m2 td-button-list">

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

            </td> */}
        
        </tr>

    )

}

export default BothCard;
