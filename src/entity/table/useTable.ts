import { useState } from 'react';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '@shared/localStorage.ts';
import { useCharacters } from '@/entity/table/useCharacters.ts';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';

export const useTable = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const sortFromStorage = getFromLocalStorage('sort')
  const filterFromStorage = getFromLocalStorage('filter')
  const {characterList, isLoading} = useCharacters()

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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage('');
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
    handleCloseModal,
    handleImageClick,
    rows,
    sortModel,
    filterModel,
    isLoading,
    selectedImage,
    openModal,
    characterList
  }
}