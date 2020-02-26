import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import Client from '../models/client';
import  './card.css';
import { statut } from '../models/statut';
import { useHistory } from 'react-router-dom';

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

    return (
        //Nom Client | Numero projet | Date Sign | Project Leader |	Statut | Detail/edit/delete

        <tr className="" style={{color: "white"}}>
            <td className="grey darken-2 m2 center border" onClick={() => goToClient(client.ClientId)}>{client.Company_Name} </td>
            <td className="grey darken-2 m2 center border" onClick={() => goToProject(project.ProjectId)}>{project.ProjectNumber}</td>
            <td className="grey darken-2 m2 center border">{project.SignatureDate.toString()
                                                                                                                                                  .slice(0, 10)
                                                                                                                                                  .split('-')
                                                                                                                                                  .join("/")}</td>
            <td className="grey darken-2 m2 center border">{project.ProjectLeader}</td>
            <td className="grey darken-2 m2 center border">{st}</td>
            <td className="m2 td-button">
                <tr  className="button-list btn blue-grey darken-1" onClick={() => goToProject(project.ProjectId)}>Detail project</tr>
                <tr  className="button-list btn blue-grey darken-1" onClick={() => goToClient(client.ClientId)}>Detail client</tr>
            </td>

        </tr>

    )

}

export default BothCard;
