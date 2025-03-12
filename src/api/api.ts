import { instance } from '../shared/instance.ts';
import { CharacterDTO, CharacterListResponse } from './types.ts';
import { AxiosResponse } from 'axios';

class ApiData {
  getCharacterList() {
    return instance.get<CharacterListResponse>('/character').then(res => {
      return res.data.results
    })
  }

  getCharacter(id: string) {
    return instance.get<AxiosResponse<CharacterDTO>>(`/character/${id}`)
  }
}

export const apiData = new ApiData()