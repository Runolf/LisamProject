import React, { FunctionComponent, useState} from 'react';
import ClientForm from '../component/client-form';
import Client from '../models/client';

const ClientAdd:FunctionComponent = () => {

    const [client] = useState<Client>(new Client());

    return ( 
        <div className="row">
                <ClientForm client={client} isEditForm={false}></ClientForm>
        </div>
    );
}

export default ClientAdd;
