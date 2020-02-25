import React, {FunctionComponent, useState} from 'react';
import Client from '../models/client';
//import {statut} from '../models/statut';
import  './project-card.css';
import { useHistory } from 'react-router-dom';


type Props = {
    client: Client,
    borderColor?: string
};



const ClientCard: FunctionComponent<Props> = ({client, borderColor = "#555555"}) => {

    const [color, setColor] = useState<string>();
    const history = useHistory();
    

    const goToClient = (id:number) => {
        history.push(`/Client/${id}`);
     }
    
     const showBorderColor = () => {
        setColor(borderColor);
      };
  
      const HideBorderColor = () => {
        setColor("#f5f5f5");
      };

    return (
        <tr className="" style={{color: "white"}} onClick={() => goToClient(client.ClientId)}>
            <td className="grey darken-2 m2 center border">{client.Company_Name}</td>
            <td className="grey darken-2 m2 center border">{client.Email}</td>
            <td className="grey darken-2 m2 center border">{client.Language}</td>
            <td className="grey darken-2 m2 center border">{client.Number}</td>
            <td className="grey darken-2 m2 center border">{client.City + " " + client.ZipCode +" " + client.Street}</td>
        </tr>

        // <div className="col" onClick={() => goToClient(client.ClientId)} onMouseOver={showBorderColor} onMouseLeave={HideBorderColor} >
        //     <div className="card horizontal" style={{borderColor: color}}>
        //     <div className="card-content col m1"></div>
        //     <div className="card-content col grey darken-2 m2 center border">Client Name: {client.Company_Name} </div>
        //     <div className="card-content col grey darken-2 m2 center border">E-mail: {client.Email} </div>
        //     <div className="card-content col grey darken-1 m2 center border">Language: {client.Language} </div>
        //     <div className="card-content col grey darken-1 m2 center border">Number: {client.Number} </div>
        //     <div className="card-content col grey darken-1 m2 center border">Adresse: {client.City + " " + client.ZipCode +" " + client.Street} </div>
        //     <div className="card-content col m1"></div>
        //     </div>
        // </div>
   
    )
};

export default ClientCard;
