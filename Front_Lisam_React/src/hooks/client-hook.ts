import {useEffect, useState} from 'react';
import Client from '../models/client';
import ClientService from '../services/client-services';

export const useClient = () => {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => { ClientService.getClients().then(clients => setClients(clients));}, [] );
  return clients;
}