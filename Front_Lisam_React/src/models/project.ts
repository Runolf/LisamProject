import Client from "./client";
import {statut} from '../models/statut';


export default class Project{
    
    ProjectId: number ;
    SignatureDate : Date;
    ProjectNumber: string;
    ProjectLeader: string;
    Statut: statut;
    Clients: Client;

    constructor(
        projectId: number,
        signatureDate: Date,
        projectNumber: string,
        projectLeader: string,
        statut: statut,
        client: Client
    ) {
        this.ProjectId = projectId;
        this.ProjectLeader = projectLeader; 
        this.ProjectNumber = projectNumber;
        this.SignatureDate = signatureDate;
        this.Statut = statut;
        this.Clients = client; 
    }
}