import React, {FunctionComponent, } from 'react';
import CandP from '../component/client-and-project-card';
import './list.css';
import { useProjects } from '../hooks/projects-hook';



export const BothList: FunctionComponent = () =>{
   const projects = useProjects();

    return (
        <div>
            <table className="container responsive-table centered ">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th>Client Name</th>
                            <th>Project number</th>
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

