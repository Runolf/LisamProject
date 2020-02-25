import {FunctionComponent} from 'react';
// import CandP from '../component/client-and-project-card';
// import Project from '../models/project';
// import Client from '../models/client';
// import ClientService from '../services/client-services';
import './list.css';
// import { useProjects } from '../hooks/projects-hook';
import { useClients } from '../hooks/clients-hook';
// import { useClient } from '../hooks/client-hook';
// import { useProject } from '../hooks/project-hook';


export const BothList: FunctionComponent = () =>{
    const clients = useClients();

    /*
        1) récupérer id client et retourner le client
        2) stocker la fk du projet du client en question
        3) récupérer le projet dont l'id est retourné par l'étape précédente
        4) retourner l'objet
    */

    // const GetProject = (idCLient: number): Project | null | undefined => {
    //     //1 
    //     var Cli = useClient(idCLient); 
    //     //2
    //      var FKProject:number|null|undefined = (Cli?.ProjectId !== undefined)? Cli.ProjectId :null;
    //     //3
    //      var Pro:Project|undefined|null = useProject(FKProject);
    //     //4
    //      return Pro;

    // }

    return ( null
        // <div className="col grid">
        //     { 
        //         clients.map((C) => <CandP key={C.ClientId} client={C} project={
        //                 GetProject(C.ClientId)
        //         }/>)
        //     }
            
        // </div>
    )
} 

