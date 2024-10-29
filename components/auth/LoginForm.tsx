'use client';

import { useAuth } from '@/hooks/use-auth';
import { LoginCredentials } from '@/types';
import { useState } from 'react';
import { redirect } from 'next/navigation'

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
 
  if (isAuthenticated) {
    redirect('/dashboard');
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      redirect('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}