import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../api';

type Tag = {
  id: string;
  title: string;
  subscribersCount: number;
};

type GetTagsReponse = {
  tags: Tag[];
};

export async function getTags(page: number, searchQuery?: string): Promise<GetTagsReponse>  {
  const response = await api.get('/tags/search', {
    params: {
      page,
      query: searchQuery
    }
  });

  const { data } = response;

  const tags = data.map(tag => {
    return {
      id: tag.id,
      title: tag.title,
      subscribersCount: tag.subscribersCount
    };
  });

  return {
    tags
  };
}

export function useTags(page: number = 1, searchQuery?: string, options?: UseQueryOptions) {
  return useQuery(['tags', [page, searchQuery]], () => getTags(page, searchQuery), {
    staleTime: 1000 * 60 * 1,
    ...options
  }) as UseQueryResult<GetTagsReponse, unknown> ;
}