import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { signOut } from '../contexts/AuthContext';

export function setupApiClient(ctx = undefined){
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/',
    headers: {
      'x-access-token': cookies['umbriel-admin.token']
    }
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      console.log(error)
      if (error.response.status === 401) {
        if (process.browser) {
          signOut();
        }
      }

      return Promise.reject(error);
    }
  );

  return api
}
