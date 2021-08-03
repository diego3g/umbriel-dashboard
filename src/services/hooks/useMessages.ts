import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../apiClient';

export type Message = {
  id: string;
  subject: string;
  sentAt: string | null;
};

type GetMessagesReponse = {
  messages: Message[];
  totalCount: number;
};

export async function getMessages(page: number, searchQuery?: string): Promise<GetMessagesReponse>  {
  const response = await api.get('/messages/search', {
    params: {
      page,
      query: searchQuery
    }
  });

  const { data, totalCount } = response.data;

  const messages: Message[] = await Promise.all(
    data.map(async message => {
      return {
        id: message.id,
        subject: message.subject,
        sentAt: message.sentAt !== null ? new Date(message.sentAt).toLocaleDateString('pt-br', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }): null
      };
    })
  );

  return {
    messages,
    totalCount
  };
}

export function useMessages(page: number = 1, searchQuery?: string, options?: UseQueryOptions) {
  return useQuery(['messages', [page, searchQuery]], () => getMessages(page, searchQuery), {
    staleTime: 1000 * 60 * 1,
    ...options
  }) as UseQueryResult<GetMessagesReponse, unknown> ;
}