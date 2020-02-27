import React, { FunctionComponent, useState } from 'react';
import Project from '../models/project';
import{useHistory} from 'react-router-dom';
import ProjectService from '../services/project-service';
import { useClients } from '../hooks/clients-hook';
import Client from '../models/client';

type Props = {
    project: Project,
    client: Client,
    isEditForm: Boolean
}

type Field = {
    value?: any, 
    error?:string, 
    isValid?: boolean
  }

type Form = {
    projectNumber: Field,
    projectLeader: Field,
    statut: Field,
    signatureDate: Field,
   // client: Field
    /*
     Champ pour ajouter le client -> faire une methode pour l'assigner. 
     Idée: faire aussi un bouton pour accéder au formulaire de création de client
     */
}

const ProjectForm: FunctionComponent<Props> = ({project ,isEditForm}) => {
   
    var Clients = useClients(); 
    const getIdClientByName =  (name: string) => {
        var result;
     if(Clients !== null){
       result = Clients.filter(client => client.Company_Name === name);
     }else{
         result = undefined
        }
    
     var dude = result.shift();
     if(dude.ClientId !== undefined)
     return dude.ClientId;
    }


    const [form, setForm] = useState<Form>({
        projectLeader: {value: project.ProjectLeader},
        projectNumber: {value: project.ProjectNumber},
        signatureDate: {value: project.SignatureDate},
        statut: {value: project.Statut},
       // client : {value: (client.Company_Name) }
    });
    const history = useHistory();

    const updateProject = () => {
        ProjectService.updateProject(project)
        .then(() =>  window.location.reload());
    }

    const addProject = () => {
        ProjectService.addProject(project)
        .then(() => history.push(`/project`));
    }

    const deleteProject = () => {
        ProjectService.deleteProject(project)
        .then(() => history.push(`/project`));
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        project.ProjectLeader = form.projectLeader.value;
        project.ProjectNumber = form.projectNumber.value;
        project.SignatureDate = form.signatureDate.value;
        project.Statut = form.statut.value;
       // project.ClientId = form.client.value;
        
        isEditForm?updateProject():addProject();
    }

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;

        const newField: Field = {[fieldName] : {value: fieldValue}};
        setForm({...form, ...newField});
    }


    return(
        <form className="container" onSubmit={e => handleSubmit(e)}>
            
            <div>
                <div> {/*is editForm */}
                        {isEditForm? (
                            <div>
                                <h3>Edit</h3>
                                
                            </div>
                        ):(
                            <div>
                                <h3>Adding</h3>
                            </div>
                        )}
                </div>

            </div>
           
            <div className="form-group">
              <label htmlFor="projectNumber">projectNumber</label>
               <input id="projectNumber" name="projectNumber" type="text" className="form-control" value={form.projectNumber.value} onChange={e => handleInputChange(e)}></input>        
            </div>

            <div className="form-group">
              <label htmlFor="projectLeader">projectLeader</label>
               <input id="projectLeader" name="projectLeader" type="text" className="form-control" value={form.projectLeader.value} onChange={e => handleInputChange(e)}></input>        
            </div>

            
            <div className="form-group">
              <label htmlFor="statut">statut</label>
               <input id="statut" name="statut" type="text" className="form-control" value={form.statut.value} onChange={e => handleInputChange(e)}></input>        
            </div>

            
            <div className="form-group">
              <label htmlFor="signatureDate">signatureDate</label>
               <input id="signatureDate" name="signatureDate" type="date" className="form-control" value={form.signatureDate.value} onChange={e => handleInputChange(e)}></input>        
            </div>
            
            {/*
                 <div className="form-group">
                 <label htmlFor="Client">Client</label>
                  <input id="Client" name="Client" type="text" className="form-control" value={form.client.value} onChange={e => handleInputChange(e)}></input>        
               </div>
                */
            }
           

            <button type="submit" className="btn grey darken-3 waves-effect waves-black">Valider</button>
            <span className="btn-floating right waves-effect waves-light">
               <i className="material-icons" onClick={deleteProject}>delete</i>
            </span>
        </form>
    )
}

export default ProjectForm;