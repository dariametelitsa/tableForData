import { CharacterDTO, CharacterListResponse } from './types.ts';

import { queryOptions } from '@tanstack/react-query';

export const apiData = {
  baseKey: 'https://rickandmortyapi.com/api',

  getCharacterList: () => {
    return queryOptions({
      queryKey: [apiData.baseKey, 'characters'],
      queryFn: async (meta): Promise<CharacterListResponse> => {
        const response = await fetch(`${apiData.baseKey}/character`, {
          signal: meta.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        return await response.json();
      },
    });
  },

  getCharacter: (id: string) => {
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


