import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link} from 'react-router-dom';
import Client from '../models/client';
import ClientService from '../services/client-services';
import "./detail.css";

type Params = {id: string};

const ClientDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {

    const [client, setClient] = useState<Client|null>(null);

    useEffect(() => {
            ClientService.getClient(+match.params.id)
            .then(client => setClient(client));
    }, [match.params.id]);

    return (
        <div> 
            {client? (
                <table className="container centered table-detail">
                    <thead>
                        <tr style={{color: "black"}}> 
                            <th>{client.Company_Name}
                                <Link to={`/client-edit/${client.ClientId}`} className="btn right grey waves-effect waves-light">
                                  <i className="material-icons">edit</i>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="grey darken-2 m2 center border">Language: <br/>{client.Language}</td>
                        </tr>
                        <tr>
                            <td className="grey darken-2 m2 center border">E-mail: <br/>{client.Email}</td>
                        </tr>
                        <tr>
                            <td className="grey darken-2 m2 center border">Phone number: <br/>{client.Number}</td>
                        </tr>
                        <tr>
                            <td className="grey darken-2 m2 center border">Address: <br/>{client.Street + " " + client.ZipCode + " " + client.City}</td>
                        </tr>
                        
                        {/* <tr>
                            <td className="grey darken-2 m2 center border">{client.Projects.map((P) => P.ProjectId) Is considered as null }</td>
                        </tr> */}
                    </tbody>
                </table>

                ):(
                    <div className="center object-notfound">
                        <h5>Pas de client trouvé</h5>
                        <Link to="/" className="waves-effect waves-teal btn-flat">
                           Home
                       </Link>
                    </div>
                    
                )
            }
        </div>
    )
}

export default ClientDetail;