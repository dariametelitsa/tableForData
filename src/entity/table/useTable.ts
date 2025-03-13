import { useState } from 'react';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '@shared/localStorage.ts';
import { useCharacterList } from '@/entity/table/useCharacterList.ts';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { Nullable } from '@shared/types.ts';

export const useTable = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Nullable<number>>(null);
  const sortFromStorage = getFromLocalStorage('sort')
  const filterFromStorage = getFromLocalStorage('filter')
  const {characterList, isLoading} = useCharacterList()

  const sortData = sortFromStorage
    ? JSON.parse(sortFromStorage)
    : [{
      field: 'id',
      sort: 'asc',
    }]

  const filterData = filterFromStorage
    ? JSON.parse(filterFromStorage)
    : { items: [] }

  const [sortModel, setSortModel] = useState<GridSortModel>(sortData);
  const [filterModel, setFilterModel] = useState<GridFilterModel>(filterData);

  const rows = characterList?.map((character) => ({
    id: character.id,
    image: character.image,
    name: character.name,
    gender: character.gender,
    status: character.status,
    created: character.created,
    episodeCount: character.episode.length,
  }));

  const onImageClick = (id: number) => {
    setSelectedCharacter(id);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setSelectedCharacter(null);
  };

  const onSortChange = (newSortModel: GridSortModel) => {
    setToLocalStorage('sort', JSON.stringify(newSortModel))
    setSortModel(newSortModel)
  }

  const onFilterChange = (newFilterModel: GridFilterModel) => {
    setToLocalStorage('filter', JSON.stringify(newFilterModel))
    setFilterModel(newFilterModel)
  }

  const onResetSettings = () => {
    removeFromLocalStorage('filter')
    removeFromLocalStorage('sort')
    setSortModel([])
    setFilterModel({items: []})
  }

  return {
    onResetSettings,
    onFilterChange,
    onSortChange,
    onCloseModal,
    onImageClick,
    rows,
    sortModel,
    filterModel,
    isLoading,
    selectedCharacter,
    openModal,
    characterList
  }
}