import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../apiClient';

type Sender = {
  id: string;
  name: string;
  email: string;
  isValidated: boolean;
  isDefault: boolean;
};

type GetSendersReponse = {
  senders: Sender[];
  totalCount: number;
};

export async function getSenders(page: number, searchQuery?: string): Promise<GetSendersReponse>  {
  const response = await api.get('/senders/search', {
    params: {
      page,
      query: searchQuery
    }
  });

  const { data, totalCount } = response.data;

  const senders = data.map(sender => {
    return {
      id: sender.id,
      name: sender.name,
      email: sender.email,
      isDefault: sender.isDefault,
      isValidated: sender.isValidated,
    };
  });

  return {
    senders,
    totalCount
  };
}

export function useSenders(page: number = 1, searchQuery?: string, options?: UseQueryOptions) {
  return useQuery(['senders', [page, searchQuery]], () => getSenders(page, searchQuery), {
    staleTime: 1000 * 60 * 1,
    ...options
  }) as UseQueryResult<GetSendersReponse, unknown> ;
}