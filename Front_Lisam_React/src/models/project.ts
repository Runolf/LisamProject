import Client from "./client";
import {statut} from '../models/statut';


export default class Project{
    
    ProjectId: number ;
    SignatureDate : Date;
    ProjectNumber: string;
    ProjectLeader: string;
    Statut: statut;
    ClientId: number;

    constructor(
        projectId: number,
        signatureDate: Date,
        projectNumber: string,
        projectLeader: string,
        statut: statut,
        clientId: number
    ) {
        this.ProjectId = projectId;
        this.ProjectLeader = projectLeader; 
        this.ProjectNumber = projectNumber;
        this.SignatureDate = signatureDate;
        this.Statut = statut;
        this.ClientId = clientId; 
    }
}