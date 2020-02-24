import Project from '../models/project';

export default class ProjectService{
    static getProjects(): Promise<Project[]> {
        return fetch('http://localhost:44331/api/Projects')
          .then(response => response.json())
          .catch(error => this.handleError(error));
      }

      
      static getProject(id: number): Promise<Project|null> {
        return fetch(`http://localhost:44331/api/Projects/${id}`)
          .then(response => response.json())
          .then(data => this.isEmpty(data)?null:data)
          .catch(error => this.handleError(error));
      }

      static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
      }

      static handleError(error: Error): void {
        console.error(error);
      }
}
