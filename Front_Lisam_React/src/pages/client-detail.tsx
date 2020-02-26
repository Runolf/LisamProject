import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Client from '../models/client';
import ClientService from '../services/client-services';
import "./detail.css";

type Params = {id: string};

const ClientDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {

    const [client, setClient] = useState<Client|null>(null);

    useEffect(() => {
            ClientService.getClient(+match.params.id)
            .then(client => setClient(client));
    }, [match.params.id]);

    return (
    <div className="detail">{client? (
    <div> 
        <div>
        <Link to={`/client-edit/${client.ClientId}`} className="btn right grey waves-effect waves-light">
           <i className="material-icons">edit</i>
        </Link>
        </div>
        <h1>{client.Company_Name}</h1>
        <p>Language: {client.Language}</p>
        <p>Mail: {client.Email}</p> 
        <p>Number: {client.Number}</p> 
        <p>Adress: {client.Street + " " + client.ZipCode + " " + client.City}</p>
        <p>{/*client.Projects.map((P) => P.ProjectId)// Is considered as null */}</p>

    </div>
    
    ):(
        <h5>Pas de client trouvé</h5>
    )}</div>
    )
}

export default ClientDetail;