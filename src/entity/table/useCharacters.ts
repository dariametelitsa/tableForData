import { useQuery } from '@tanstack/react-query';
import { apiData } from '@/api/api.ts';
import { CharacterListDTO } from '@/api/types.ts';

export const useCharacters = () => {
  const {
    error,
    data: characterList,
    isLoading,
    refetch,
  } = useQuery({
    ...apiData.getCharacterList(),
    select: (data): CharacterListDTO => data.results
  });

  return {
    error,
    characterList,
    isLoading,
    refetch,
  };
}