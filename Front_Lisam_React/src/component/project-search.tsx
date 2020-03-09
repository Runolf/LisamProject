 import React, { FunctionComponent, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Projects from '../models/project';
// import ProjectService from '../services/project-service';
// import { useProjects } from '../hooks/projects-hook';
 const ProjectSearch: FunctionComponent = () => {
    
//     const [term, setTerm] = useState<string>(''); // terme chercher par le user
//     const [projects, SetProjects] = useState<Projects[]>([]); // sert a stocker les projects correspondant à la recherche

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//             const term = e.target.value;
//             setTerm(term);

//             if(term.length <= 1){           // si term fait moins que 2 char, on retourne un tableau vide
//                 SetProjects([]);
//                 return;
//             }
//            // ProjectService.searchProject(term).then(Projects => SetProjects(Projects));
//     }
    
    return ( null

        // <div>
        //     <input type="text" name="SearchProject" id="SearchProject" onChange={e => handleInputChange(e)}/>
        //     <div>
        //         {projects.map((project) => (
        //             <Link key={project.ProjectId} to={`/Project/${project.ProjectId}`} >
        //                 {project.ProjectNumber}
        //             </Link>
        //         ))}
        //     </div>
        // </div>
    )
}

// export default ProjectSearch;