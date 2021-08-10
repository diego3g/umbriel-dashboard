import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../apiClient';

type Contact = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetContactsReponse = {
  contacts: Contact[];
  totalCount: number;
};

export async function getContacts(page: number, searchQuery?: string): Promise<GetContactsReponse>  {
  const response = await api.get('/contacts/search', {
    params: {
      page,
      query: searchQuery
    }
  });

  const { data, totalCount } = response.data;

  const contacts = data.map(contact => {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      createdAt: new Date(contact.created_at).toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  });

  return {
    contacts,
    totalCount
  };
}

export function useContacts(page: number = 1, searchQuery?: string, options?: UseQueryOptions) {
  return useQuery(['contacts', [page, searchQuery]], () => getContacts(page, searchQuery), {
    staleTime: 1000 * 60 * 1,
    ...options
  }) as UseQueryResult<GetContactsReponse, unknown> ;
}