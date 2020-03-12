import React, { FunctionComponent, useState } from 'react';
import Client from '../models/client';
import{useHistory} from 'react-router-dom';
import ClientService from '../services/client-services';
import { useClients } from '../hooks/clients-hook';
import '../pages/form.css';
import ProjectService from '../services/project-service';

type Props = {
    client: Client,
    isEditForm: Boolean
}

type Field = {
    value?: any, 
    error?:string, 
    isValid?: boolean
  }

  type Form = {
    companyName: Field,
    street: Field,
    zipCode: Field,
    city: Field, 
    email: Field,
    language: Field,
    number: Field,
    //Projects: Field 
}



const ClientForm: FunctionComponent<Props> = ({client, isEditForm}) => {

    const [form, setForm] = useState<Form>({
        companyName: {value: client.Company_Name}, 
        email: {value: client.Email},
        language: {value: client.Language},
        number: {value: client.Number},
        city: {value: client.City},
        street: {value: client.Street},
        zipCode: {value: client.ZipCode}
    });
    const history = useHistory();
    const Clients = useClients();
   
    const updateClient = () => {
        ClientService.updateClient(client)
        .then(() => history.push(`/client/${client.ClientId}`));
    }
    const addClient = () => {
        ClientService.addClient(client)
        .then(() => history.push(`/client`));
    }

    const deleteClient = () =>  {
        
        client.Projects.map((P) => 
            ProjectService.deleteProject(P)
        );

        ClientService.deleteClient(client)
        .then(() => history.push(`/client`));
      }
   
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const isFormValid = validateForm();

        if(isFormValid === true){
            client.Company_Name = form.companyName.value;
            client.Email = form.email.value;
            client.Language = form.language.value;
            client.Number = form.number.value;
            client.City = form.city.value;
            client.ZipCode = form.zipCode.value;
            client.Street = form.street.value;

           isEditForm?updateClient():addClient();
        }
      
    }

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;

        const newField: Field = {[fieldName] : {value: fieldValue}};
        setForm({...form, ...newField});
    }

    const validateForm = () => {
      
        let newForm: Form = form;
        const validEmail: RegExp = /^[a-zA-Z0-9]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$/ ;
        const noValueEmail: RegExp = /^[x]{1,}@[x]{1,}.[x]{1,}$/ ;
        const noValue: string = "no value";

        //MAIL VALIDATOR
       if(!validEmail.test(form.email.value) || noValueEmail.test(form.email.value)){
           const errorMsg:string = "enter a valid mail";
           const newField: Field = {value: form.email.value, error: errorMsg, isValid: false};
           newForm = {...newForm, ...{email: newField}};
       }
       else{
        const newField: Field = {value: form.email.value, isValid: true};
        newForm = {...newForm, ...{email: newField}};
       }

       // CLIENT_NAME VALIDATOR
       
        const CName = Clients.map(C => C.Company_Name);
       
        var name:string  =  form.companyName.value;
        var nameExist:boolean = false;
        const stringRegex: RegExp = /^[A-Za-zéèàù ]+$/;
        const numberRegex: RegExp = /^[0-9 ]+$/;

        //si dans le formulaire d'ajout
        if(!isEditForm){
            for(let test of CName){
                if((name.toUpperCase() === test.toUpperCase())){
                    nameExist = true;
                    break;
                }
            }
        }
        // si dans le formulaire d edition et que la valeur du champ est différente du nom actuel du client
        if(isEditForm && name.toUpperCase() !== client.Company_Name.toUpperCase()){
            for(let test of CName){
                if((name.toUpperCase() === test.toUpperCase())){
                    nameExist = true;
                    break;
                }
            }
        }
        
            if(nameExist === true || name === "" || name === noValue){
                const errorMsg:string = "that name exists or is not valid";
                const newField: Field = {value: form.companyName.value, error: errorMsg, isValid: false};
                newForm = {...newForm, ...{companyName: newField}};
            }
            else{
                const newField: Field = {value: form.companyName.value, isValid: true};
                newForm = {...newForm, ...{companyName: newField}};
            }

        // PHONE NUMBER VALIDATOR
        const phoneNumber: string = form.number.value;
        const validPhone: RegExp = /^[0-9 ]+$/;
        if(!validPhone.test(form.number.value) || phoneNumber === noValue || phoneNumber === ""){
            const errorMsg:string = "enter valid phone number";
            const newField: Field = {value: form.number.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{number: newField}};
        }else{
            const newField: Field = {value: form.number.value, isValid: true};
            newForm = {...newForm, ...{number: newField}};
        }

        // LANGUAGE VALIDATOR
        const language: string = form.language.value;
        if(!stringRegex.test(language) ||language === noValue || language === ""){
            const errorMsg:string = "enter valid language";
            const newField: Field = {value: form.language.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{language: newField}};
        }else{
            const newField: Field = {value: form.language.value, isValid: true};
            newForm = {...newForm, ...{language: newField}};
        }

        // CITY VALIDATOR
        const city: string = form.city.value;
        if(!stringRegex.test(city) || city === noValue || city === ""){
            const errorMsg:string = "enter valid city";
            const newField: Field = {value: form.city.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{city: newField}};
        }else{
            const newField: Field = {value: form.city.value, isValid: true};
            newForm = {...newForm, ...{city: newField}};
        }

        // ZIP CODE VALIDATOR
        const zipCode: string = form.zipCode.value;
        if(!numberRegex.test(zipCode) || zipCode === noValue || zipCode === ""){
            const errorMsg:string = "enter valid zip code";
            const newField: Field = {value: form.zipCode.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{zipCode: newField}};
        }else{
            const newField: Field = {value: form.zipCode.value, isValid: true};
            newForm = {...newForm, ...{zipCode: newField}};
        }

        // STREET VALIDATOR
        const street: string = form.street.value;
        if(!stringRegex.test(street) || street === noValue || street === ""){
            const errorMsg:string = "enter valid street";
            const newField: Field = {value: form.street.value, error: errorMsg, isValid: false};
            newForm = {...newForm, ...{street: newField}};
        }else{
            const newField: Field = {value: form.street.value, isValid: true};
            newForm = {...newForm, ...{street: newField}};
        }

       setForm(newForm);

       return (
            newForm.email.isValid &&
            newForm.companyName.isValid && 
            newForm.language.isValid &&
            newForm.number.isValid && 
            newForm.city.isValid &&
            newForm.zipCode.isValid &&
            newForm.street.isValid === true)?true:false;
    }

   

    return(
        <form className="container" onSubmit={e => handleSubmit(e)}>
            <div>
                <div>
                        {isEditForm? (
                            <div>
                                <h3 className="center" style={{color: 'black'}}>Edit {client.Company_Name}
                                    <span className="btn-floating right waves-effect waves-light">
                                        <i className="material-icons grey" onClick={deleteClient}>delete</i>
                                    </span>
                                </h3>
                                
                            </div>
                        ):(
                            <div>
                                <h3 className="center" style={{color: 'black'}}>Add client</h3>
                            </div>
                        )}
                </div>

            </div>
            
           {/*Company Name*/}
            <div className="form-group">
                    {
                        (form.companyName.isValid === false)?
                        <label htmlFor="companyName" style={{color: 'red'}}>Company name : {form.companyName.error}</label>: <label htmlFor="companyName" >Company name</label>
                    }
                    <input id="companyName" name="companyName" type="text" className="form-control" value={form.companyName.value} onChange={e => handleInputChange(e)}></input>        
            </div>
            
            {/*Email*/}
            <div className="form-group">
                    {
                        (form.email.isValid === false)?
                        <label htmlFor="email" style={{color: 'red'}}>E-mail : {form.email.error}</label>: <label htmlFor="email">E-mail</label>
                    }
                    <input id="email" name="email" type="text" className="form-control" value={form.email.value} onChange={e => handleInputChange(e)}></input>        
                   
            </div>
            
            {/*Phone Number*/}
            <div className="form-group">
                {form.number.isValid === false?<label htmlFor="number" style={{color: 'red'}}>Phone number: {form.number.error}</label>:<label htmlFor="number">Phone number</label> }                   
                    
                <input id="number" name="number" type="text" className="form-control" value={form.number.value} onChange={e => handleInputChange(e)}></input>        
            </div>

            {/*Language*/}
            <div className="form-group">
                {form.language.isValid === false? <label htmlFor="language" style={{color: 'red'}}>language: {form.language.error}</label> : <label htmlFor="language">language</label> }
                    
                    <input id="language" name="language" type="text" className="form-control" value={form.language.value} onChange={e => handleInputChange(e)}></input>        
            </div>
            
            {/*Address*/}
            <br/>
            <div className="form-group">

                <h6>Address</h6>
                {form.city.isValid === false? <label htmlFor="city" style={{color: 'red'}}>city: {form.city.error}</label> : <label htmlFor="city">city</label>}     
                    <input id="city" name="city" type="text" className="form-control" value={form.city.value} onChange={e => handleInputChange(e)}></input> 
              
                {form.zipCode.isValid === false? <label htmlFor="zipCode" style={{color: 'red'}}>zip code: {form.zipCode.error}</label> : <label htmlFor="zipCode">zip code</label>}    
                    <input id="zipCode" name="zipCode" type="text" className="form-control" value={form.zipCode.value} onChange={e => handleInputChange(e)}></input>       
                    
                {form.street.isValid === false? <label htmlFor="street"  style={{color: 'red'}}>street: {form.street.error}</label> :  <label htmlFor="street">street</label>}      
                    <input id="street" name="street" type="text" className="form-control" value={form.street.value} onChange={e => handleInputChange(e)}></input>
            </div>
                            
            <button type="submit" className="btn grey darken-3 waves-effect waves-black">Submit</button>
            
        </form>

    )
}

export default ClientForm;