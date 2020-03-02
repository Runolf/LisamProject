import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Project from '../models/project';
import ProjectService from '../services/project-service';
import "./detail.css";
import { statut } from '../models/statut';
import formatDate from '../helpers/format-date';

type Params = {id: string};
const ProjectDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {
    
    const [project, SetProject] = useState<Project|null>(null);
    
    //const history = useHistory();
    
    useEffect(() => {
        ProjectService.getProject(+match.params.id)
        .then(project => SetProject(project));
        }, [match.params.id]);



        {/* why those test below?
            Obligation de passer par ces test sinon il y a un message d'erreur qui
            plante l'application disant que project est possiblement null. 

            date:
                obligation de passer par cette convertion pour pouvoir utiliser les
                méthodes .getDate, .getMonth etc... Sinon l'application ne reconnait 
                pas project.SignatureDate comme une date ... 

            st:
                Obligation de passe par un test s'il est undefined, sinon il y a 
                un message d'erreur faisant planter l'application
                
        */}
        var date:Date = new Date();
        var st: string|null = null;
        
        if (project === null || project === undefined) {
            date = new Date();
            st = null;
        }
        else{
            if(project.SignatureDate !== undefined && project.Statut !== undefined){
                date = new Date(project.SignatureDate);
                st = statut[project.Statut];
            }
        }
        

            return (
                <div>
                    {project? ( 
                    <table className="container responsive-table centered table-detail">
                        <thead>
                            <tr style={{color: "black"}}>
                            <th>Project: {project.ProjectNumber}
                            <Link to={`/project-edit/${project.ProjectId}`} className="btn right grey waves-effect waves-light">
                                    <i className="material-icons">edit</i>
                                </Link>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr> 
                                <td className="grey darken-2 m2 center border">Project leader: <br/>
                                {project.ProjectLeader}</td>
                            </tr>
                          
                            <tr>
                                <td className="grey darken-2 m2 center border">Signature date:<br/> 
                                {formatDate(date)}</td> 
                            </tr>
                          
                             <tr>
                                <td className="grey darken-2 m2 center border">Statut:<br/>
                                {st}</td>
                            </tr>


                            { project.Client?
                                <tr>
                                    <td className="grey darken-2 m2 center border">Client:<br/> {project.Client.Company_Name}</td>
                                </tr>
                                :
                                <tr>
                                    <td className="grey darken-2 m2 center border">Pas de client</td>
                                </tr>
                            }
                            
                        </tbody>
                        
                    </table>
                    
                    ):(
                        <div className="center object-notfound">
                            <h5>Pas de projet trouvé</h5>
                            <Link to="/" className="waves-effect waves-teal btn-flat">
                            Home
                            </Link>
                        </div>
                    )}
                </div>
            );
        
      
}

export default ProjectDetail; 