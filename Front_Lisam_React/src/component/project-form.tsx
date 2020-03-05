import React, { FunctionComponent, useState } from 'react';
import Project from '../models/project';
import{useHistory, Link} from 'react-router-dom';
import ProjectService from '../services/project-service';
import Client from '../models/client';
import { useProjects } from '../hooks/projects-hook';
import '../pages/form.css'; 
import { useClients } from '../hooks/clients-hook';
// import Select from 'react-select';
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
        .then(() => history.push(`/project`));
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
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        const fieldName: string = e.target.name;
        const fieldValue: string|number = e.target.value;

        const newField: Field = {[fieldName] : {value: fieldValue}};
        setForm({...form, ...newField});
    }
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
         const fieldName: string = e.target.name;
         const fieldValue: string = e.target.value;

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
        const PNumber = Projects.map(P => P.ProjectNumber);
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
        var idExist: boolean = false; 
        var idS = Clients.map(C => C.ClientId);
        for(let test of idS){
            if(form.clientId.value === test.toString()){
                idExist = true;
                break;
            }
        }

        if(!validClient.test(form.clientId.value) || form.clientId.value === "0" || !idExist){
            const errorMsg:string = "Id Client is equal or below to 0 or must be a number";
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
        var currentDate:String = yyyy + "-" + mm + "-" + dd;
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
               <input id="projectNumber" name="projectNumber" type="text" className="form-control" placeholder="no-value" value={form.projectNumber.value} onChange={e => handleInputChange(e)}></input>
            </div>

            {/*Project leader*/}
            <div className="form-group">
            {form.projectLeader.isValid === false?<label htmlFor="projectLeader"  style={{color: 'red'}}>project Leader: {form.projectLeader.error}</label>:<label htmlFor="projectLeader">project Leader</label> }
              
               <input id="projectLeader" name="projectLeader" type="text" className="form-control" value={form.projectLeader.value} onChange={e => handleInputChange(e)}></input>
            </div>

            {/*status*/}
            {/* <div className="form-group">
            {form.statut.isValid === false?<label htmlFor="statut"  style={{color: 'red'}}>{form.statut.error}1 open | 2 signed | 3 factured | 4 work in progress | 5 closed</label> : <label htmlFor="statut">statut: 1 open | 2 signed | 3 factured | 4 work in progress | 5 closed</label> }
              
               <input id="statut" name="statut" type="text" className="form-control" value={form.statut.value} onChange={e => handleInputChange(e)}></input>
        
            </div> */}
            <br/>
             <div>
             {form.statut.isValid === false?<label htmlFor="statut"  style={{color: 'red'}}>{form.statut.error}</label> : <label htmlFor="statut">statut</label> }
                <select name="statut" id="statut" className="browser-default" value={form.statut.value} onChange={e => handleSelectChange(e)}>
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
            <div className="form-group">
            { form.clientId.isValid === false?<label htmlFor="Client" style={{color: 'red'}}>Client: {form.clientId.error}</label>:<label htmlFor="Client">Client</label>}
                 <br/>
                <Link to="/client" target="_blank">List of clients by identifiant</Link>
                <input id="Client" name="clientId" value={form.clientId.value } type="number" className="form-control" onChange={e => handleInputChange(e)}></input>
            </div>

            {/* <select name="clientId" id="Client">
                {
                     Clients.forEach(function(c){
                       return <option value={c.ClientId}>{c.Company_Name}</option>
                     })
                };
                
            </select> */}
            <button type="submit" className="btn grey darken-3 waves-effect waves-black">Submit</button>
            
        </form>
    )
}

export default ProjectForm;
