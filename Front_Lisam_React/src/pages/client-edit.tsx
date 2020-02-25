import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ClientForm from '../component/client-form';
import Client from '../models/client';
import ClientServices from '../services/client-services';
import '../pages/detail.css';

type Params = { id: string };

const ClientEdit: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
            ClientServices.getClient(+match.params.id)
            .then(client => setClient(client));
        } , [match.params.id]
    );

    return (
        <div className="detail">
            {client? (
                    <div className="row">
                     <h2 className="header center">Éditer { client.Company_Name }</h2>
                     <ClientForm client={client} isEditForm={true}></ClientForm>
                </div>
            ) : (
                <h4 className="center">Aucun client à afficher !</h4>
             )}
        </div>
    )
};

export default ClientEdit;