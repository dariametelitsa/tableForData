import { useQuery } from '@tanstack/react-query';
import { apiData } from '@/api/api.ts';

export const useCharacterList = () => {
  const {
    error,
    data: characterList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['characters', 'all'],
    queryFn: apiData.getMoreCharacterList,
  });

  return {
    error,
    characterList,
    isLoading,
    refetch,
  };
};