import React, { FunctionComponent, useState, useEffect } from 'react';
import ClientForm from '../component/client-form';
import Client from '../models/client';

type Params = { id: string };

const ClientAdd:FunctionComponent = () => {
    const [client] = useState<Client>();

    return (
        <div className="row">
            <h2 className="header center">Ajouter un pokemon </h2>
                <ClientForm client={client} isEditForm={false}></ClientForm>
        </div>
    );
}

export default ClientAdd;
