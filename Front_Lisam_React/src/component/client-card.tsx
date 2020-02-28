import React, {FunctionComponent} from 'react';
import Client from '../models/client';
import  './card.css';
import { useHistory } from 'react-router-dom';


type Props = {
    client: Client,
    borderColor?: string
};



const ClientCard: FunctionComponent<Props> = ({client, borderColor = "#555555"}) => {

    //const [color, setColor] = useState<string>();
    const history = useHistory();
    

    const goToClient = (id:number) => {
        history.push(`/Client/${id}`);
     }
    
    //  const showBorderColor = () => {
    //     setColor(borderColor);
    //   };
  
    //   const HideBorderColor = () => {
    //     setColor("#f5f5f5");
    //   };

    return (
        <tr className="" style={{color: "white"}} onClick={() => goToClient(client.ClientId)}>
            <td className="grey darken-2 m2 center border">{client.ClientId}</td>
            <td className="grey darken-2 m2 center border">{client.Company_Name}</td>
        </tr>
   
    )
};

export default ClientCard;
