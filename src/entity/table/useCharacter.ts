import { useQuery } from '@tanstack/react-query';
import { apiData } from '@/api/api.ts';

export const useCharacter = (id: number) => {
  const {
    data: character,
    isLoading,
  } = useQuery({
    ...apiData.getCharacter(id)
  });

  return {
    character,
    isLoading,
  };
};