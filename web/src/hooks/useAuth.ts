import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/api/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const nav = useNavigate();
  const login = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
      nav('/');
    },
  });
  const logout = () => {
    localStorage.removeItem('token');
    nav('/login');
  };
  return { login, logout };
};
