import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import Client from '../models/client';
import  './project-card.css';

type Props = {
    client: Client,
    project: Project | undefined | null
};

const bothCard: FunctionComponent<Props> = ({client, project}) => {
    return (
        <div className="row" >
            <div className="card-content col m1"></div>
            <div className="card-content col grey darken-2 m2 center border">Client Name: {client.Company_Name} </div>
            <div className="card-content col grey darken-2 m2 center border">Project number: { project?(
                project.ProjectNumber
            ) : (
                <p>Projet non trouvé</p>
            )
                
            } </div>
        </div>

    )

} 

export default bothCard;