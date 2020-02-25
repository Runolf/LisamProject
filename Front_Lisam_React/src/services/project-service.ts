import Project from '../models/project';

export default class ProjectService{
    static getProjects(): Promise<Project[]> {

      var res =  fetch('http://localhost:44331/api/Projects')
          .then(response => response.json())
          .catch(error => this.handleError(error));
          debugger;
          return res;
      }

      
      static getProject(id: number): Promise<Project|null> {
        return fetch(`http://localhost:44331/api/Projects/${id}`)
          .then(response => response.json())
          .then(data => this.isEmpty(data)?null:data)
          .catch(error => this.handleError(error));
      }

      static addProject(project: Project): Promise<Project>{

        delete project.ProjectId;
        //delete client.Projects;
 
         return fetch(`http://localhost:44331/api/Projects`,{
         method: 'POST',
         body: JSON.stringify(project),
         headers: {'Content-Type': 'application/json'} 
       })
         .then(response => response.json())
         .catch(error => this.handleError(error));
     } 
     
     static updateProject(project: Project): Promise<Project>{

      return fetch(`http://localhost:44331/api/Projects/${project.ProjectId}`,{
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {'Content-Type': 'application/json'} 
    })
      .then(response => response.json())
      .catch(error => this.handleError(error));
  } 

  static deleteProject(project: Project): Promise<{}>{

    return fetch(`http://localhost:44331/api/Projects/${project.ProjectId}`,{
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
