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
    
        <div className="col grid">
             { 
                projects.map((P) => <CandP key={P.ProjectId} project={P} client={P.Client}/>)
            } 
            
        </div>
    );
} 

