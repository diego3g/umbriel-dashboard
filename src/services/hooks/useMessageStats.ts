import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../apiClient';

type MessageStats = {
  recipientsCount: number;
  deliverCount: number;
  openRate: number;
  clickCount: number;
  clickRate: number;
};

type GetMessageStatsReponse = {
  stats: MessageStats;
};

export async function getMessageStats(messageId): Promise<GetMessageStatsReponse>  {
  const response = await api.get(`/messages/${messageId}/stats`);

  const data = response.data;

  return {
    stats: data,
  };
}

export function useMessageStats(messageId: string, options?: UseQueryOptions) {
  return useQuery(['message', [messageId]], () => getMessageStats(messageId), {
    staleTime: 1000 * 60 * 1,
    ...options
  }) as UseQueryResult<GetMessageStatsReponse, unknown> ;
}