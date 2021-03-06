import React, { FunctionComponent, useState } from 'react';
import Project from '../models/project';
import{useHistory} from 'react-router-dom';
import ProjectService from '../services/project-service';
import Client from '../models/client';
import { useProjects } from '../hooks/projects-hook';
import '../pages/form.css'; 
import { useClients } from '../hooks/clients-hook';
import { statut } from '../models/statut';

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
}

const ProjectForm: FunctionComponent<Props> = ({project,isEditForm}) => {

    const [form, setForm] = useState<Form>({
        projectLeader: {value: project.ProjectLeader},
        projectNumber: {value: project.ProjectNumber},
        signatureDate: {value: project.SignatureDate},
        statut:        {value: project.Statut},
        clientId :     {value: project.ClientId }
    });
    const history = useHistory();
    const Projects = useProjects();
    const Clients = useClients(); 

   
    const transformDateToFormDate = (date: string): string => {
        return date.slice(0,10);
    }
    const updateProject = () => {
        ProjectService.updateProject(project)
        .then(() => history.push(`/project/${project.ProjectId}`) /*window.location.reload()*/);
    }
    const addProject = () => {
        ProjectService.addProject(project)
        .then(() => history.push(`/both`));
    }
    const deleteProject = () => {
        ProjectService.deleteProject(project)
        .then(() => history.push(`/project`));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const isFormIsValid = validateForm();
        if(isFormIsValid=== true){

            project.ProjectLeader = form.projectLeader.value;
            project.ProjectNumber = form.projectNumber.value;
            project.SignatureDate = form.signatureDate.value;
            project.Statut = form.statut.value;
            project.ClientId = form.clientId.value;

            isEditForm?updateProject():addProject();
        }
        
    }
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {

        const fieldName: string = e.target.name;
        const fieldValue: string|number = e.target.value;

        const newField: Field = {[fieldName] : {value: fieldValue}};
        setForm({...form, ...newField});
    }

    const validateForm = () => {
      
        let newForm: Form = form;
        const noValue: string = "no value";
        const stringRegex: RegExp = /^[A-Za-zéèàùç\- ]+$/;
        const numberRegex: RegExp = /^[0-9 ]+$/;

        // PROJECT LEADER VALIDATOR
        const ProjectLeader: string = form.projectLeader.value;
        if(!stringRegex.test(ProjectLeader) || ProjectLeader === noValue || ProjectLeader === ""){
            const errorMsg:string = "enter valid name";
            const newField: Field = {value: form.projectLeader.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{projectLeader: newField}};
        }else{
            const newField: Field = {value: form.projectLeader.value, isValid: true};
            newForm = {...newForm, ...{projectLeader: newField}};
        }

        //STATUT VALIDATOR
        const validStatut:RegExp = /^[1-5]$/;
        if(!validStatut.test(form.statut.value)){
            const errorMsg:string = "choose a statut";
            const newField: Field = {value: form.statut.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{statut: newField}};
        }else{
         const newField: Field = {value: form.statut.value, isValid: true};
         newForm = {...newForm, ...{statut: newField}};
        }
        
        // PROJECT NUMBER VALIDATOR
        var PNumber = ['0'];
        if(Projects !== undefined)
         PNumber = Projects.map(P => P.ProjectNumber);
         
        var ProjectExist: boolean = false;
        const number: string = form.projectNumber.value;

        if(!isEditForm){
            for(let test of PNumber){
                if(number.toUpperCase() === test.toUpperCase()){
                    ProjectExist = true;
                    break;
                }
            }   
        }

        if(isEditForm && number.toUpperCase() !==  project.ProjectNumber.toUpperCase()){
            for(let test of PNumber){
                if(number.toUpperCase() === test.toUpperCase()){
                    ProjectExist = true;
                    break;
                }
            }   
        }
    
        if(!numberRegex.test(number) || ProjectExist === true || number === noValue || number === ""){
            const errorMsg:string = "Project number exist or is invalid";
            const newField: Field = {value: form.projectNumber.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{projectNumber: newField}};
        }else{
            const newField: Field = {value: form.projectNumber.value, isValid: true};
            newForm = {...newForm, ...{projectNumber: newField}};
        }
        
        // ID CLIENT VALIDATOR
        const validClient: RegExp = /^[0-9]+$/;
      
        if(!validClient.test(form.clientId.value)){
            const errorMsg:string = "Choose a value";
            const newField: Field = {value: form.clientId.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{clientId: newField}};
        }else{
            const newField: Field = {value: form.clientId.value, isValid: true};
            newForm = {...newForm, ...{clientId: newField}};
        }
        
        // DATE VALIDATOR
        var today:Date = new Date();
        var dd = today.getDate().toString().padStart(2, '0');
        var mm = (today.getMonth() + 1).toString().padStart(2, '0');
        var yyyy = today.getFullYear().toString();
        var currentDate:String = yyyy + "-" + mm + "-" + dd+"T:00:00:00";
        today.setHours(0,0,0,0);
        
        const formDate:Date = form.signatureDate.value;
       
        if(formDate.toString() > currentDate){
            const errorMsg:string = "Date must be lesser or equal to current date";
            const newField: Field = {value: form.signatureDate.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{signatureDate: newField}};
        }else{
            const newField: Field = {value: form.signatureDate.value, isValid: true};
            newForm = {...newForm, ...{signatureDate: newField}};
        }

        setForm(newForm);
 
        return (
            newForm.statut.isValid && 
            newForm.projectNumber.isValid && 
            newForm.clientId.isValid  && 
            newForm.signatureDate.isValid &&
            newForm.projectLeader.isValid === true
            )?true:false;
     }

    return(
        <div> {project !== undefined?  
            <form className="container" onSubmit={e => handleSubmit(e)}>
                <div>{/*is editForm */}
                    <div> 
                            {isEditForm? (
                                <div>
                                    <h3 className="center" style={{color: 'black'}}>Edit {project.ProjectNumber}
                                    <span className="btn-floating right waves-effect waves-light">
                                        <i className="material-icons grey" onClick={deleteProject}>delete</i>
                                    </span>
                                    </h3>

                                </div>
                            ):(
                                <div>
                                    <h3 className="center" style={{color: 'black'}}>Add project</h3>
                                </div>
                            )}
                    </div>

                </div>

                <br/><br/>

                {/*Project number*/}
                <div className="form-group">
                    { 
                        form.projectNumber.isValid===false?<label htmlFor="projectNumber" style={{color: 'red'}}>project Number: {form.projectNumber.error}</label>
                        : <label htmlFor="projectNumber">project Number</label>
                    }
                <input id="projectNumber" name="projectNumber" type="text" className="form-control" placeholder={form.projectNumber.value} onChange={e => handleInputChange(e)}></input>
                </div>

                {/*Project leader*/}
                <div className="form-group">
                {form.projectLeader.isValid === false?<label htmlFor="projectLeader"  style={{color: 'red'}}>project Leader: {form.projectLeader.error}</label>:<label htmlFor="projectLeader">project Leader</label> }
                
                <input id="projectLeader" name="projectLeader" type="text" className="form-control" placeholder={form.projectLeader.value} onChange={e => handleInputChange(e)}></input>
                </div>

                {/*status*/}
                <br/> 

                {/*Select Statuts*/}
                <div>
                    {console.log("L'erreur 'index.js:1 Warning: `value` prop on `select` should not be null.' n'est pas grave")}
                {form.statut.isValid === false?<label htmlFor="statut"  style={{color: 'red'}}>{form.statut.error}</label> : <label htmlFor="statut">statut</label> }
                    <select name="statut" id="statut" className="browser-default" value={form.statut.value} onChange={e => handleInputChange(e)}>
                        <option value="">--choose a value--</option>
                        <option value={statut.Closed}>Closed</option>
                        <option value={statut.Factured}>Factured</option>
                        <option value={statut.Open}>Open</option>
                        <option value={statut.Signed}>Signed</option>
                        <option value={statut.Work_in_progress}>Work in progress</option>
                    </select>
                </div>
                <br/>


                {/*Signature date*/}
                {isEditForm? 
                    <div className="form-group">
                        {form.signatureDate.isValid === false?<label htmlFor="signatureDate" style={{color: 'red'}}>signature Date : {form.signatureDate.error}</label>:<label htmlFor="signatureDate">signature Date</label>}             
                    
                        <input id="signatureDate" name="signatureDate" type="date" className="form-control" value={transformDateToFormDate(form.signatureDate.value)} onChange={e => handleInputChange(e)}></input>
                    </div>
                    :
                    <div className="form-group">
                        {form.signatureDate.isValid === false?<label htmlFor="signatureDate" style={{color: 'red'}}>signature Date : {form.signatureDate.error}</label>:<label htmlFor="signatureDate">signature Date</label>}             
                        <input id="signatureDate" name="signatureDate" type="date" className="form-control" value={form.signatureDate.value} onChange={e => handleInputChange(e)}></input>
                    </div>
                }

                {/*ClientId*/}     
                {form.clientId.isValid === false?<label htmlFor="SelectClient"  style={{color: 'red'}}>{form.clientId.error}</label> : <label htmlFor="SelectClient">Clients</label> }
                <select name="clientId" id="SelectClient" className="browser-default" value={form.clientId.value} onChange={e => handleInputChange(e)}>
                    <option value="">--choose a value--</option>
                    { Clients !== undefined?
                        Clients.map((Client) => 
                            <option key={Client.Company_Name} value={Client.ClientId} >{Client.Company_Name}</option>
                        ).sort()
                        : <p>not found</p>
                    }
                    
                </select><br/>

                <button type="submit" className="btn grey darken-3 waves-effect waves-black">Submit</button>

                </form> 
                : <p>project not found!</p>    
            }
        </div>
    )
}

export default ProjectForm;
