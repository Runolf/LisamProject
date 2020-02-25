import React, { FunctionComponent, useState, useEffect } from 'react';
import ClientForm from '../component/client-form';
import Client from '../models/client';

const ClientAdd:FunctionComponent = () => {

    const [client] = useState<Client>(new Client(
    0,"no value","no value","no value","no value","no value","no value","no value",0
            ));

    return ( 
        <div className="row">
            <h2 className="header center">Ajouter un client </h2>
                <ClientForm client={client} isEditForm={false}></ClientForm>
        </div>
    );
}

export default ClientAdd;
