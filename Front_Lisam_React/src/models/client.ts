export default class Client{

   ClientId: number;
   Company_Name: string;

    Street: string;
    ZipCode: string;
    City: string; 
    
    Email: string;
    Language: string;
    Number: string;

    ProjectId: number;

    constructor(
        clientId: number,
        companyName: string,
        street: string,
        zipCode: string,
        City: string,
        email: string,
        language: string,
        number: string,
        projectId: number
    ) {
        this.ClientId = clientId;
        this.Company_Name = companyName;
        this.Street = street;
        this.ZipCode = zipCode;
        this.City = City;
        this.Email = email;
        this.Language = language;
        this.Number = number;
        this.ProjectId = projectId;
    }
}