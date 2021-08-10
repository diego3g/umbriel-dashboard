import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../apiClient';

type ContactWithDetails = {
  id: string
  name: string
  email: string
  is_unsubscribed: boolean
  is_blocked: boolean
  subscriptions: Array<{
    id: string
    tag: {
      id: string
      title: string
    }
  }>
  messages: Array<{
    id: string
    subject: string
    sentAt: Date
    events: Array<{
      id: string
      type: string
      createdAt: Date
    }>
  }>
};

type GetContactDetailsReponse = {
  contact: ContactWithDetails;
};

export async function getContacts(contactId: string): Promise<GetContactDetailsReponse>  {
  const response = await api.get(`/contacts/${contactId}`);

  const { data } = response;

  return {  
    contact: data
  };
}

export function useContactDetails(contactId: string, options?: UseQueryOptions) {
  return useQuery(['contact', [contactId]], () => getContacts(contactId), {
    staleTime: 5,
    ...options
  }) as UseQueryResult<GetContactDetailsReponse, unknown> ;
}