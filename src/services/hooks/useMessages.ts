import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../api';

type Message = {
  id: string;
  subject: string;
  sentAt: string | null;
  stats: {
    recipientsCount: number;
    openRate: number;
    clickCount: number;
    clickRate: number;
  }
};

type GetMessagesReponse = {
  messages: Message[];
  totalCount: number;
};

async function getMessageStats(messageId: string) {
  const response = await api.get(`/messages/${messageId}/stats`);

  return response.data;
}

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
        sentAt: message.sentAt !== null ? new Date(message.sentAt).toLocaleDateString('en-us', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }): null,
        stats: await getMessageStats(message.id)
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