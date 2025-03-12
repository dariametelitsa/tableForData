import { useEffect, useState } from 'react';
import { apiData } from '@/api/api.ts';
import { CharacterListDTO } from '@/api/types.ts';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridCellParams, GridFilterModel, GridSortModel, GridToolbar } from '@mui/x-data-grid';
import { Modal } from '@components/modal/Modal.tsx';
import { getFromLocalStorage, setToLocalStorage } from '@shared/localStorage.ts';

export const Table = () => {
  const [characters, setCharacters] = useState<CharacterListDTO>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const sortFromStorage = getFromLocalStorage('sort')
  const filterFromStorage = getFromLocalStorage('filter')

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
  console.log(filterModel);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiData.getCharacterList();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching character list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
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
          style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
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

  const rows = characters.map((character) => ({
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

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Typography variant="h4" gutterBottom>
        Character List
      </Typography>
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