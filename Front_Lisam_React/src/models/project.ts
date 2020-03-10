import Client from "./client";
import {statut} from '../models/statut';


export default class Project{
    
    ProjectId: number ;
    SignatureDate : Date;
    ProjectNumber: string;
    ProjectLeader: string;
    Statut: statut;
    IsActive: boolean;
    ClientId: number |null;
    Client: Client;

    constructor(
        projectId: number = 0,
        signatureDate: Date = new Date(),
        projectNumber: string = "no value",
        projectLeader: string = "no value",
        statut: statut = 0,
        isActive: boolean = true,
        clientId: number = 0,
        client: Client = new Client()
    ) {
        this.ProjectId = projectId;
        this.ProjectLeader = projectLeader; 
        this.ProjectNumber = projectNumber;
        this.SignatureDate = signatureDate;
        this.Statut = statut;
        this.IsActive = isActive;
        this.ClientId = clientId; 
        this.Client = client;
    }
}