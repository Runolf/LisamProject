import React, {FunctionComponent} from 'react';
import CandP from '../component/client-and-project-card';
import './list.css';
import { useProjects } from '../hooks/projects-hook';
import { useHistory } from 'react-router-dom';

export const BothList: FunctionComponent = () =>{
   const projects = useProjects();
   const history = useHistory();
    

   const goToAddProject = () => {
    if(projects !== undefined){
        history.push(`/project-add`);
    }
}

const goToAddClient = () => {
    if(projects !== undefined){
        history.push(`/client-add`);
    }
}   

    return (
        <div>
            <table className="container centered ">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th>Client Name <br/>
                             <div  className="button-both btn blue-grey darken-1 waves-effect waves-teal z-depth-3" onClick={() => goToAddClient()}>Add client</div>
                            </th>
                            <th>Project number <br/>
                              <div  className="button-both btn blue-grey darken-1 waves-effect waves-teal z-depth-3" onClick={() => goToAddProject()}>Add project</div>
                            </th>
                            <th>Date signature</th>
                            <th>Project leader</th>
                            <th>Statut</th>
                        </tr>
                     </thead>
                     <tbody className="row grid">
                        {
                            projects?
                            projects.map((P) => 
                            P.IsActive === true?
                            <CandP key={P.ProjectId} project={P} client={P.Client}/>
                            : ""
                            )
                            : <div><p className="center" style={{color:"black"}}>API doesn't work!</p></div> 
                    
                        }
                    </tbody>
            </table>
        </div>
    );
}
