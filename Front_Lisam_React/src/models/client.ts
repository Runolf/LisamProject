export default class Client{
    clientId: number;
    companyName: string;

    street: string;
    zipCode: string;
    city: string; 
    
    email: string;
    language: string;
    number: string;

    projectId: number;

    constructor(
        clientId: number,
        companyName: string,
        street: string,
        zipCode: string,
        city: string,
        email: string,
        language: string,
        number: string,
        projectId: number
    ) {
        this.clientId = clientId;
        this.companyName = companyName;
        this.street = street;
        this.zipCode = zipCode;
        this.city = city;
        this.email = email;
        this.language = language;
        this.number = number;
        this.projectId = projectId;
    }
}