import React, {FunctionComponent} from 'react';
import CandP from '../component/client-and-project-card';
import Project from '../models/project';
import Client from '../models/client';
import './list.css';
import { useProject } from '../hooks/project-hook';
import { useClient } from '../hooks/client-hook';

export const bothList: FunctionComponent = () =>{
    const projects = useProject();
    const clients = useClient();

    return (
        <div className="col grid">
            { 
                clients.map((C) => <CandP key={C.ClientId} client={C}/>)
            }
            
        </div>
    )
} 

