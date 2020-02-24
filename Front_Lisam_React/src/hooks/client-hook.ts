import {useEffect, useState} from 'react';
import Client from '../models/client';
import ClientService from '../services/client-services';

export const useClient = (id: number) => {
    const [client, setClient] = useState<Client | null>();

    useEffect(() =>
                    { 
                        ClientService.getClient(id)
                        .then(client => setClient(client)); } 
                        , []);
  return client;
}