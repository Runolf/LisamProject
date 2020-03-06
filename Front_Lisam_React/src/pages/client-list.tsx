import React, {FunctionComponent} from 'react';
import { useClients } from '../hooks/clients-hook';
import ClientCard from '../component/client-card';
import './list.css';
import { useHistory } from 'react-router-dom';


const List: FunctionComponent = () => {

    const client = useClients();
    const history = useHistory();
    const goToAddProject = () => {
        history.push(`/project-add`);
    }
    return (
        <div>
            <div  className="button-both btn blue-grey darken-1 waves-effect waves-teal z-depth-3" onClick={() => goToAddProject()}>Add project</div>
            <table className="container responsive-table centered ">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th>Identifiant</th> 
                            <th>Client Name</th>
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
