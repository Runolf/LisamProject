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
    projectId: Field
}

const ClientForm: FunctionComponent<Props> = ({client, isEditForm}) => {

    const [form, setForm] = useState<Form>({
        companyName: {value: client.Company_Name}, 
        email: {value: client.Email},
        language: {value: client.Language},
        number: {value: client.Number},
        city: {value: client.City},
        street: {value: client.Street},
        zipCode: {value: client.ZipCode}, 
        projectId: {value: client.ProjectId}
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

    const isAddForm = () => {
        return !isEditForm;
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        client.Company_Name = form.companyName.value;
        client.Email = form.email.value;
        client.Language = form.language.value;
        client.Number = form.number.value;
        client.City = form.city.value;
        client.ZipCode = form.zipCode.value;
        client.Street = form.street.value;
        client.ProjectId = form.projectId.value;

        isEditForm?updateClient():addClient();
    }

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;

        const newField: Field = {[fieldName] : {value: fieldValue}};
        setForm({...form, ...newField});
    }


    return(
        <form onSubmit={e => handleSubmit(e)}>
            <div>
                {isEditForm && (
                    <div>
                        <h1>Edit</h1>
                        <span className="btn-floating halfway-fab waves-effect waves-light">
                            <i className="material-icons" onClick={deleteClient}>delete</i>
                        </span>
                    </div>
                )}
            </div>

            <div>
                {isAddForm && (
                    <h1>Adding</h1>
                )}
            </div>

            <button type="submit" className="btn">Valider</button>
        </form>

    )
}

export default ClientForm;