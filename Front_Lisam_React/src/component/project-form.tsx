import React, { FunctionComponent, useState } from 'react';
import Project from '../models/project';
import{useHistory, Link} from 'react-router-dom';
import ProjectService from '../services/project-service';
import Client from '../models/client';
// import Select from 'react-select';
// import { statut } from '../models/statut';

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
    clientId: Field
    /*
     Champ pour ajouter le client -> faire une methode pour l'assigner.
     Idée: faire aussi un bouton pour accéder au formulaire de création de client
     */
}

const ProjectForm: FunctionComponent<Props> = ({project,isEditForm}) => {

    // const options = [
    //     { value: statut.Closed, label: 'Closed' },
    //     { value: statut.Factured, label: 'Factured' },
    //     { value: statut.Open, label: 'Open' },
    //     { value: statut.Signed ,label: 'Signed' } ,
    //     { value: statut.Work_in_progress ,label: 'Work in progress' }
    //   ];


    


    

    const [form, setForm] = useState<Form>({
        projectLeader: {value: project.ProjectLeader},
        projectNumber: {value: project.ProjectNumber},
        signatureDate: {value: project.SignatureDate},
        statut:        {value: project.Statut},
        clientId :     {value: project.ClientId }
    });
    const history = useHistory();

    const updateProject = () => {
        ProjectService.updateProject(project)
        .then(() => history.push(`/project/${project.ProjectId}`) /*window.location.reload()*/);
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
        project.ClientId = form.clientId.value;

        isEditForm?updateProject():addProject();
    }

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        const fieldName: string = e.target.name;
        const fieldValue: string|number = e.target.value;

        const newField: Field = {[fieldName] : {value: fieldValue}};
        setForm({...form, ...newField});
    }

    // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //      const fieldName: string = e.target.name;
    //      const fieldValue: string = e.target.value;

    //      const newField: Field = {[fieldName] : {value: fieldValue}};
    //      setForm({...form, ...newField});
    // }



    return(
        <form className="container" onSubmit={e => handleSubmit(e)}>

            <div>{/*is editForm */}
                <div> 
                        {isEditForm? (
                            <div>
                                <h3 className="center" style={{color: 'black'}}>Edit {project.ProjectNumber}</h3>

                            </div>
                        ):(
                            <div>
                                <h3 className="center" style={{color: 'black'}}>Add product</h3>
                            </div>
                        )}
                </div>

            </div>

            {
            /* <div className="form-group">
              <label> choisissez le statut
                  <Select options = {options} onChange={e => handleSelectChange(e)}/>
              </label>
            </div> */
            }

        <div className="form-group" >
            <div className="input-field col s12">
                <label htmlFor="select">StatutSelect</label>
                <select id="select" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
         </div>
            <br/><br/>
            <div className="form-group">
              <label htmlFor="projectNumber">project Number</label>
               <input id="projectNumber" name="projectNumber" type="text" className="form-control" value={form.projectNumber.value} onChange={e => handleInputChange(e)}></input>
            </div>

            <div className="form-group">
              <label htmlFor="projectLeader">project Leader</label>
               <input id="projectLeader" name="projectLeader" type="text" className="form-control" value={form.projectLeader.value} onChange={e => handleInputChange(e)}></input>
            </div>


            <div className="form-group">
              <label htmlFor="statut">statut: 1 open | 2 signed | 3 factured | 4 work in progress | 5 closed</label>
               <input id="statut" name="statut" type="text" className="form-control" value={form.statut.value} onChange={e => handleInputChange(e)}></input>
            </div>

            

            <div className="form-group">
              <label htmlFor="signatureDate">signature Date</label>
               <input id="signatureDate" name="signatureDate" type="date" className="form-control" value={form.signatureDate.value} onChange={e => handleInputChange(e)}></input>
            </div>


              <div className="form-group">
                 <label htmlFor="Client">Client</label> <br/>
                 <Link to="/client" target="_blank">List of clients by identifiant</Link>
                  <input id="Client" name="clientId" value={form.clientId.value } type="number" className="form-control" onChange={e => handleInputChange(e)}></input>
               </div>

             

            <button type="submit" className="btn grey darken-3 waves-effect waves-black">Submit</button>
            <span className="btn-floating right waves-effect waves-light">
               <i className="material-icons" onClick={deleteProject}>delete</i>
            </span>
        </form>
    )
}

export default ProjectForm;
