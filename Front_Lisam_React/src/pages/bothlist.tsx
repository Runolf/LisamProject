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
    const clients = useClients();

    /*
        1) récupérer id client et retourner le client
        2) stocker la fk du projet du client en question
        3) récupérer le projet dont l'id est retourné par l'étape précédente
        4) retourner l'objet
    */

    const GetClient = (idCLient: number)/*: Client*/ => {
        
    }

    return (
        <div className="col grid">
            {/* { 
                clients.map((C) => <CandP key={C.ClientId} client={C} project={
                        GetClient()
                }/>)
            } */}
            
        </div>
    );
} 

