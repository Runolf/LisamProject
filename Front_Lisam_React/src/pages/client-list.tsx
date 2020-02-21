import React, {FunctionComponent} from 'react';
import { useClient } from '../hooks/client-hook';
import ClientCard from '../component/client-card';
import './list.css';


const List: FunctionComponent = () => {

    const client = useClient();
    
    return (
        <div>
            <table className="container">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th>Client Name</th>
                            <th>The table header</th>
                            <th>The table header</th>
                            <th>The table header</th>
                            <th>The table header</th>
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
