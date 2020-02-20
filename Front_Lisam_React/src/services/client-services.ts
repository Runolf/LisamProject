import Client from '../models/client';

export default class ClientService{ 
    static getClients(): Promise<Client[]> {
        return fetch('http://localhost:44331/api/Client')
          .then(response => response.json())
          .catch(error => this.handleError(error));
      }



      static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
      }
    
      static handleError(error: Error): void {
        console.error(error);
      }
}