import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../apiClient';

type Template = {
  id: string;
  title: string;
  isDefault: boolean;
};

type GetTemplatesReponse = {
  templates: Template[];
  totalCount: number;
};

export async function getTemplates(page: number, searchQuery?: string): Promise<GetTemplatesReponse>  {
  const response = await api.get('/templates/search', {
    params: {
      page,
      query: searchQuery
    }
  });

  const { data, totalCount } = response.data;

  const templates = data.map(template => {
    return {
      id: template.id,
      title: template.title,
      isDefault: template.isDefault
    };
  });

  return {
    templates,
    totalCount
  };
}

export function useTemplates(page: number = 1, searchQuery?: string, options?: UseQueryOptions) {
  return useQuery(['templates', [page, searchQuery]], () => getTemplates(page, searchQuery), {
    staleTime: 1000 * 60 * 1,
    ...options
  }) as UseQueryResult<GetTemplatesReponse, unknown> ;
}