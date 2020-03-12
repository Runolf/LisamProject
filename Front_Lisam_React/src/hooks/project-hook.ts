import {useEffect, useState} from 'react';
import Project from '../models/project';
import ProjectService from '../services/project-service';

export const useProject = (id : number | null) => {
    const [project, setProject] = useState<Project | null>();

    useEffect(() => { 
                if(id !== null)
                ProjectService.getProject(id)
                .then(project => setProject(project)); 
              }
            , []);
          
         
  
  return project;
}