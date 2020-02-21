import {useEffect, useState} from 'react';
import Project from '../models/project';
import ProjectService from '../services/project-service';

export const useProject = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => 
              { ProjectService.getProjects()
                .then(projects => setProjects(projects)); }
            , []);
  
  return projects;
}