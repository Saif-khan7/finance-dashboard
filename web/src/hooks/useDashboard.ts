import { useQuery } from '@tanstack/react-query';
import { getSummary } from '@/api/dashboard';

export const useSummary = () =>
  useQuery({ queryKey: ['summary'], queryFn: getSummary });
