enum statut {
    Open = 1,
    Signed = 2,
    Factured = 3,
    Work_In_Progress = 4,
    Closed = 5
}
export default class Project{
    
    projectId: number;
    signatureDate: Date;
    projectNumber: string;
    projectLeader: string;
    statut: statut;

    constructor(
        projectId: number,
        signatureDate: Date = new Date(),
        projectNumber: string,
        projectLeader: string,
        statut: statut,
    ) {
        this.projectId = projectId;
        this.projectLeader = projectLeader; 
        this.projectNumber = projectNumber;
        this.signatureDate = signatureDate;
        this.statut = statut;
    }
}