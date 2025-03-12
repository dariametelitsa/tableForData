import { Nullable } from '../shared/types.ts';

export type CharacterDTO = {
  "id": number,
  "name": string,
  "status": 'Alive' | 'Dead' | 'unknown',
  "species": string
  "type": string
  "gender": 'Female' | 'Male' | 'Genderless' | 'unknown'
  "origin": {
    "name": string
    "url": string
  },
  "location": {
    "name": string
    "url": string
  },
  "image": string
  "episode": string[],
  "url": string,
  "created": string
}

export type CharacterListDTO = CharacterDTO[]

export type CharacterListResponse = {
  info: {
    count: number
    pages: number
    next: Nullable<string>
    prev: Nullable<string>
  }
  results: CharacterListDTO
}