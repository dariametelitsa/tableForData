import { instance } from '../shared/instance.ts';
import { CharacterDTO, CharacterListResponse } from './types.ts';

class ApiData {
  getCharacterList() {
    return instance.get<CharacterDTO>('/character')
  }

  getCharacter(id: string) {
    return instance.get<CharacterListResponse>(`/character/${id}`)
  }
}

export const apiData = new ApiData()