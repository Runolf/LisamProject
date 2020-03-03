import React, {FunctionComponent} from 'react';
import Client from '../models/client';
import  './card.css';


type Props = {
    client: Client,
    borderColor?: string
};



const ClientCard: FunctionComponent<Props> = ({client}) => {

    return (
        <tr className="" style={{color: "white"}}>
            <td className="grey darken-2 m2 center border">{client.ClientId}</td>
            <td className="grey darken-2 m2 center border">{client.Company_Name}</td>
        </tr>
   
    )
};

export default ClientCard;
