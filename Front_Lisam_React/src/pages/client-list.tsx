import React, {FunctionComponent} from 'react';
import { useClients } from '../hooks/clients-hook';
import ClientCard from '../component/client-card';
import './list.css';


const List: FunctionComponent = () => {

    const client = useClients();
    
    return (
        <div>
            <table className="container responsive-table centered ">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th>Client Name</th>
                            <th>E-Mail</th>
                            <th>Language</th>
                            <th>Phone number</th>
                            <th>Address</th>
                        </tr>
                     </thead>
                     <tbody className="row grid">
                     { client.map((C) => 
                        <ClientCard key={C.ClientId} borderColor="green" client={C}/> 
                        )}  
                     </tbody>
                
            </table>
        </div>
            
    );


}

export default List;
