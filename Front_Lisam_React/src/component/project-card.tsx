import React, {FunctionComponent} from 'react';
import Project from '../models/project';

type Props = {
    project: Project
};

const projectCard: FunctionComponent<Props> = ({project}) => {
    return (
    <div>Ce composant affiche la donnée: {project.ProjectLeader}</div>
    )
};

export default projectCard;
