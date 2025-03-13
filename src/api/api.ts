import { CharacterDTO, CharacterListResponse } from './types.ts';

import { queryOptions } from '@tanstack/react-query';

export const apiData = {
  baseKey: 'https://rickandmortyapi.com/api',

  getCharacterList: (page: number = 1) => {
    return queryOptions({
      queryKey: [apiData.baseKey, 'characters', page],
      queryFn: async (meta): Promise<CharacterListResponse> => {
        const response = await fetch(`${apiData.baseKey}/character?page=${page}`, {
          signal: meta.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        return await response.json();
      },
    });
  },

  async getMoreCharacterList (): Promise<CharacterDTO[]> {
    const allCharacters: CharacterDTO[] = [];
    let currentPage = 1;

    while (currentPage < 10) {
      const response = await fetch(`${apiData.baseKey}/character?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      const data: CharacterListResponse = await response.json();
      allCharacters.push(...data.results);
      currentPage++;
    }

    return allCharacters;
  },

  getCharacter: (id: number) => {
    return queryOptions({
      queryKey: [apiData.baseKey, 'character'],
      queryFn: async (meta): Promise<CharacterDTO> => {
        const response = await fetch(`${apiData.baseKey}/character/${id}`, {
          signal: meta.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        return await response.json();
      },
    });
  },
}


