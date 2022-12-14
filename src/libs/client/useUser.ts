import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const useUser = () => {
  const { data, error, isValidating } = useSWR('/api/users/me');
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/sign-in');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: (!data && !error) || isValidating };
};

export default useUser;
