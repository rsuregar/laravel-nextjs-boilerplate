// hooks/useRequireAuth.ts
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './use-auth';

export function useRequireAuth() {
  const { isAuthenticated, isLoadingUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      // If the user is not authenticated, redirect to the login page
      router.push('/login'); // Adjust the path to your login page
    }
    return () => {};
  }, [isAuthenticated, isLoadingUser, router]);
}
