import Project from "./project";

export default class Client{

   ClientId: number;
   Company_Name: string;

    Street: string;
    ZipCode: string;
    City: string; 
    
    Email: string;
    Language: string;
    Number: string;

    //Projects: Project[] = [];

    constructor(
        clientId: number = 0,
        companyName: string = "no value",
        street: string = "no value",
        zipCode: string = "no value",
        City: string = "no value",
        email: string = "no value",
        language: string = "no value",
        number: string = "no value",
        //Projects: Project[] = new Project[0]()
    ) {
        this.ClientId = clientId;
        this.Company_Name = companyName;
        this.Street = street;
        this.ZipCode = zipCode;
        this.City = City;
        this.Email = email;
        this.Language = language;
        this.Number = number;
        //this.Projects = Projects;
    }
}