import React, {FunctionComponent} from 'react';
import { useClient } from '../hooks/client-hook';
import ClientCard from '../component/client-card';
import './list.css';


const List: FunctionComponent = () => {

    //const projects = useProject();
    const client = useClient();

    return (
            <div className="col grid">
                { client.map((C) =>
                    <ClientCard key={C.ClientId} client={C}/> 
                    )} 

            </div>
    );


}

export default List;
