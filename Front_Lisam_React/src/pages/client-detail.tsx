import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps} from 'react-router-dom';
import Client from '../models/client';
import ClientService from '../services/client-services';

type Params = {id: string};

const ClientDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {

    const [client, setClient] = useState<Client|null>(null);

    useEffect(() => {
            ClientService.getClient(+match.params.id)
            .then(client => setClient(client));
    }, [match.params.id]);

    return (
    <div>{client? (
    <h1>{client.Company_Name}</h1>
    ):(
        <h5>Pas de client trouvé</h5>
    )}</div>
    )
}

export default ClientDetail;