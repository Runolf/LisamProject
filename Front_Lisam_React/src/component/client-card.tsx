import React, {FunctionComponent} from 'react';
import Client from '../models/client';
import  './card.css';
import { useHistory } from 'react-router-dom';


type Props = {
    client: Client,
    borderColor?: string
};



const ClientCard: FunctionComponent<Props> = ({client}) => {

    const history = useHistory();

    const goToModifyClient = (id: number) => {
        history.push(`/client-edit/${id}`);
    }

    return (
        <tr className="" style={{color: "white"}}>
            <td className="grey darken-2 m2 center border">{client.ClientId}
                <tr  className="button-list btn blue-grey darken-2 waves-effect waves-teal z-depth-3 left" onClick={() => goToModifyClient(client.ClientId)}>Modif</tr>
            </td>
            <td className="grey darken-2 m2 center border">{client.Company_Name}</td>
            
        </tr>
   
    )
};

export default ClientCard;
