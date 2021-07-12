import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import decode from 'jwt-decode';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['umbriel-admin.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      destroyCookie(ctx, 'umbriel-admin.token');

      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }
  };
}
