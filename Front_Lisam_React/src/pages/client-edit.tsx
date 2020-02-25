import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ClientForm from '../component/client-form';
import Client from '../models/client';
import ClientServices from '../services/client-services';

type Params = { id: string };

const ClientEdit: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {
    const [client, setClient] = useState<Client | null>(null);
    
}