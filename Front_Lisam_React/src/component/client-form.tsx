import React, { FunctionComponent, useState } from 'react';
import Client from '../models/client';
import{useHistory} from 'react-router-dom';
import ClientService from '../services/client-services';

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

    const updateClient = () => {
        ClientService.updateClient(client)
        .then(() => history.push(`/client/${client.ClientId}`));
    }
    const addClient = () => {
        ClientService.addClient(client)
        .then(() => history.push(`/client`));
    }

    const deleteClient = () =>  {
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
       const validEmail: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ ;
        const noValueEmail: RegExp = /^[x]{1,}@[x]{1,}.[x]{1,}$/ ;
       //MAIL VALIDATOR
       if(!validEmail.test(form.email.value) || noValueEmail.test(form.email.value)){
           const errorMsg:string = "enter a valid mail";
           const newField: Field = {value: form.email.value, error: errorMsg, isValid: false};
           newForm = {...newForm, ...{email: newField}};
       }else{
        const newField: Field = {value: form.email.value, isValid: true};
        newForm = {...newForm, ...{email: newField}};
       }



       setForm(newForm);

       return (newForm.email.isValid === true)?true:false;
    }

    return(
        <form className="container" onSubmit={e => handleSubmit(e)}>
            <div>
                <div>
                        {isEditForm? (
                            <div>
                                <h3 className="center" style={{color: 'black'}}>Edit {client.Company_Name}
                                    <span className="btn-floating right waves-effect waves-light">
                                        <i className="material-icons" onClick={deleteClient}>delete</i>
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
            
           
            <div className="form-group">
                    <label htmlFor="companyName">Company name</label>
                    <input id="companyName" name="companyName" type="text" className="form-control" value={form.companyName.value} onChange={e => handleInputChange(e)}></input>        
            </div>
            

            <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="text" className="form-control" value={form.email.value} onChange={e => handleInputChange(e)}></input>        
                    {form.email.isValid === false? <h4 style={{color: 'red'}}>bad mail</h4>: <h4 style={{color: 'blue'}}>OK</h4> }
            </div>

            <div className="form-group">
                    <label htmlFor="number">number</label>
                    <input id="number" name="number" type="text" className="form-control" value={form.number.value} onChange={e => handleInputChange(e)}></input>        
            </div>
            
            <div className="form-group">
                    <label htmlFor="language">language</label>
                    <input id="language" name="language" type="text" className="form-control" value={form.language.value} onChange={e => handleInputChange(e)}></input>        
            </div>
            
            <div className="form-group">
                <h6>Adress</h6>
                    <label htmlFor="city">city</label>
                    <input id="city" name="city" type="text" className="form-control" value={form.city.value} onChange={e => handleInputChange(e)}></input> 
                    <label htmlFor="zipCode">zip code</label>
                    <input id="zipCode" name="zipCode" type="text" className="form-control" value={form.zipCode.value} onChange={e => handleInputChange(e)}></input>       
                    <label htmlFor="street">street</label>
                    <input id="street" name="street" type="text" className="form-control" value={form.street.value} onChange={e => handleInputChange(e)}></input>
            </div>
                            
            <button type="submit" className="btn grey darken-3 waves-effect waves-black">Valider</button>
            
        </form>

    )
}

export default ClientForm;