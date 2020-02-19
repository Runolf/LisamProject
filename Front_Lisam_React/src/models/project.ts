import Client from "./client";

enum statut {
    Open = 1,
    Signed = 2,
    Factured = 3,
    Work_In_Progress = 4,
    Closed = 5
}
export default class Project{
    
    ProjectId: number;
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