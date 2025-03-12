import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridCellParams, GridFilterModel, GridSortModel, GridToolbar } from '@mui/x-data-grid';
import { Modal } from '@components/modal/Modal.tsx';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '@shared/localStorage.ts';
import { useCharacters } from '@/entity/table/useCharacters.ts';

export const Table = () => {

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const sortFromStorage = getFromLocalStorage('sort')
  const filterFromStorage = getFromLocalStorage('filter')
  const {characterList, isLoading, error} = useCharacters()

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

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>
  }

  if(!characterList) {
    return <Typography variant="h6">Empty data</Typography>
  }

  if(error) {
    return <Typography variant="h6">Error in fetching data, try again</Typography>
  }

  const columns = [
    { field: 'id',
      headerName: 'ID',
      width: 90,
      sortable: true,
      renderCell: (params: GridCellParams) => (
        <Typography
          color={'primary'}
          sx={{fontFamily: 'Verdana', display: 'flex'}}>
          {params.value as string}
        </Typography>
      ),
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params: GridCellParams) => (
        <img
          src={params.value as string}
          alt="Character"
          style={{ width: '90px', height: 'auto', cursor: 'pointer' }}
          onClick={() => handleImageClick(params.value as string)}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      sortable: true,
      filterable: true,
      renderCell: (params: GridCellParams) => (
        <Typography
          color={'info'}
          sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
          {params.value as string}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      filterable: true,
      renderCell: (params: GridCellParams) => (
        <Typography
          color={'warning'}
          sx={{fontFamily: 'Verdana' }}>
          {params.value as string}
        </Typography>
      ),
    },
    {
      field: 'created',
      headerName: 'Created',
      width: 200,
      sortable: true,
      renderCell: (params: GridCellParams ) => (
        <Typography
          color={'textDisabled'}
          sx={{ fontStyle: 'italic' }}>
          {new Date(params.value as string).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'episodeCount',
      headerName: 'Episodes Count',
      width: 180,
      sortable: true,
      renderCell: (params: GridCellParams) => (
        <Typography
          color={'success'}
          sx={{ fontFamily: 'Courier New' }}>
          {params.value as string}
        </Typography>
      ),
    },
  ];

  const rows = characterList.map((character) => ({
    id: character.id,
    image: character.image,
    name: character.name,
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

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Typography variant="h4" gutterBottom>
        Character List
      </Typography>
      <Button onClick={onResetSettings}>Reset settings</Button>

      <DataGrid
        rows={rows}
        columns={[...columns]}
        getRowHeight={() => 'auto'}
        getEstimatedRowHeight={() => 300}
        slots={{
          toolbar: GridToolbar,
        }}
        checkboxSelection
        sx={{
          '.MuiDataGrid-cell': {
            maxHeight: '300px',
            minHeight: '100px',
            overflow: 'scroll',
            height: 'auto',
            display: 'flex',
            alignItems: 'center'
          },
        }}
        sortModel={sortModel}
        onSortModelChange={onSortChange}
        filterModel={filterModel}
        onFilterModelChange={onFilterChange}
      />
        <Modal handleCloseModal={handleCloseModal} openModal={openModal} selectedImage={selectedImage} />
    </Box>
  )
}