import Client from '../models/client';

export default class ClientService{ 
  
    static getClients(): Promise<Client[]> {
        return fetch('http://localhost:44331/api/Client')
          .then(response => response.json())
          .catch(error => this.handleError(error));
      }

      static getClient(id: number): Promise<Client|null> {
        return fetch(`http://localhost:44331/api/Client/${id}`)
          .then(response => response.json())
          .then(data => this.isEmpty(data)?null:data)
          .catch(error => this.handleError(error));
      }

    static addClient(client: Client): Promise<Client>{

        return fetch(`http://localhost:44331/api/Client`,{
        method: 'POST',
        body: JSON.stringify(client),
        headers: {'Content-Type': 'application/json'} 
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    } 

    static updateClient(client: Client): Promise<Client>{

      return fetch(`http://localhost:44331/api/Client/${client.ClientId}`,{
      method: 'PUT',
      body: JSON.stringify(client),
      headers: {'Content-Type': 'application/json'} 
    })
      .then(response => response.json())
      .catch(error => this.handleError(error));
  } 


  static deleteClient(client: Client): Promise<{}>{

    return fetch(`http://localhost:44331/api/Client/${client.ClientId}`,{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'} 
  })
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