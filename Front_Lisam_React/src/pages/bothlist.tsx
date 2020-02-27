import React, {FunctionComponent, } from 'react';
import CandP from '../component/client-and-project-card';
import './list.css';
import { useProjects } from '../hooks/projects-hook';
import { useHistory } from 'react-router-dom';



export const BothList: FunctionComponent = () =>{
   const projects = useProjects();
   const history = useHistory();

   const goToAddProject = () => {
    history.push(`/project-add`);
}

const goToAddClient = () => {
   history.push(`/client-add`);
}
    
    return (
        <div>
            <table className="container responsive-table centered ">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th>Client Name
                            <td  className="button-both btn blue-grey darken-1" onClick={() => goToAddClient()}>Add client</td>
                            </th>
                            <th>Project number
                            <td  className="button-both btn blue-grey darken-1" onClick={() => goToAddProject()}>Add project</td>
                            </th>
                            <th>Date signature</th>
                            <th>Project leader</th>
                            <th>Statut</th>
                        </tr>
                     </thead>
                     <tbody className="row grid">
                        { 
                            projects.map((P) => <CandP key={P.ProjectId} project={P} client={P.Client}/>)
                        } 
                    </tbody>
            </table>
        </div>
    );
} 

