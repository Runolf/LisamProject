import React, {FunctionComponent, } from 'react';
import CandP from '../component/client-and-project-card';
import Project from '../models/project';
import Client from '../models/client';
import ClientService from '../services/client-services';
import './list.css';
import { useProjects } from '../hooks/projects-hook';
import { useClients } from '../hooks/clients-hook';
import { useClient } from '../hooks/client-hook';
import { useProject } from '../hooks/project-hook';


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

