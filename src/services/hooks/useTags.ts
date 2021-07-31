import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../apiClient';

type Tag = {
  id: string;
  title: string;
  subscribersCount: number;
};

type GetTagsReponse = {
  tags: Tag[];
  totalCount: number;
};

export async function getTags(page: number, searchQuery?: string): Promise<GetTagsReponse>  {
  const response = await api.get('/tags/search', {
    params: {
      page,
      query: searchQuery
    }
  });

  const { data, totalCount } = response.data;

  const tags = data.map(tag => {
    return {
      id: tag.id,
      title: tag.title,
      subscribersCount: tag.subscribersCount
    };
  });

  return {
    tags,
    totalCount
  };
}

export function useTags(page: number = 1, searchQuery?: string, options?: UseQueryOptions) {
  return useQuery(['tags', [page, searchQuery]], () => getTags(page, searchQuery), {
    staleTime: 1000 * 60 * 1,
    ...options
  }) as UseQueryResult<GetTagsReponse, unknown> ;
}