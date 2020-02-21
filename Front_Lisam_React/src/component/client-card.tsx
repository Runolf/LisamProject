import React, {FunctionComponent} from 'react';
import Project from '../models/project';
import Client from '../models/client';
//import {statut} from '../models/statut';
import  './project-card.css';


type Props = {
    client: Client,
    project?: Project
};


const clientCard: FunctionComponent<Props> = ({client}) => {
    
    return (
        <div className="row" >
            <div className="card-content col m1"></div>
            <div className="card-content col grey darken-2 m2 center border">Client Name: {client.Company_Name} </div>
            <div className="card-content col grey darken-2 m2 center border">E-mail: {client.Email} </div>
            <div className="card-content col grey darken-1 m2 center border">Language: {client.Language} </div>
            <div className="card-content col grey darken-1 m2 center border">Number: {client.Number} </div>
            <div className="card-content col grey darken-1 m2 center border">Adresse: {client.city + " " + client.Street} </div>
            <div className="card-content col m1"></div>
        </div>
   
    )
};

export default clientCard;
