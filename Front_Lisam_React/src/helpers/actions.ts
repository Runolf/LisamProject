import { useHistory } from "react-router-dom";
import { FunctionComponent } from "react";

const history = useHistory();

export default class Actions{
    
    static goToClient = (id:number) => {
    
        history.push(`/Client/${id}`);
     }

     static goToProject = (id:number) => {
        history.push(`/Project/${id}`);
     }

     static goToModifyProject = (id: number) => {
        history.push(`/project-edit/${id}`);
    }

    static goToModifyClient = (id: number) => {
        history.push(`/client-edit/${id}`);
    }

}