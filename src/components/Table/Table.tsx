import { useEffect, useState } from 'react';
import { apiData } from '@/api/api.ts';
import { CharacterListDTO } from '@/api/types.ts';
import { Box, Modal, Typography } from '@mui/material';
import { DataGrid, GridCellParams, GridToolbar } from '@mui/x-data-grid';

export const Table = () => {
  const [characters, setCharacters] = useState<CharacterListDTO>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

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

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 90 },
  //   { field: 'name', headerName: 'Name', width: 200 },
  //   { field: 'status', headerName: 'Status', width: 150 },
  //   { field: 'species', headerName: 'Species', width: 150 },
  //   { field: 'gender', headerName: 'Gender', width: 120 },
  //   { field: 'origin', headerName: 'Origin', width: 200 },
  //   { field: 'location', headerName: 'Location', width: 200 },
  // ];
  const columns = [
    { field: 'id',
      headerName: 'ID',
      width: 90,
      sortable: true,
      renderCell: (params: GridCellParams) => (
        <Typography sx={{ color: 'green', fontFamily: 'Verdana', display: 'flex'}}>
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
        <Typography sx={{ color: 'blue', fontFamily: 'Arial', fontWeight: 'bold' }}>
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
        <Typography sx={{ color: 'green', fontFamily: 'Verdana' }}>
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
        <Typography sx={{ fontStyle: 'italic', color: 'gray' }}>
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
        <Typography sx={{ color: 'purple', fontFamily: 'Courier New' }}>
          {params.value as string}
        </Typography>
      ),
    },
  ];

  // const rows = characters.map((character) => ({
  //   id: character.id,
  //   name: character.name,
  //   status: character.status,
  //   species: character.species,
  //   gender: character.gender,
  //   origin: character.origin.name,
  //   location: character.location.name,
  // }));

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

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Typography variant="h4" gutterBottom>
        Character List
      </Typography>
      {/*<div style={{ height: 500, width: '100%' }}>*/}
        <DataGrid
          rows={rows}
          columns={columns}
          getRowHeight={() => 'auto'}
          slots={{
            toolbar: GridToolbar,
          }}
          checkboxSelection
          sx={{
            '.MuiDataGrid-cell': {
              maxHeight: '300px',
              minHeight: '100px',
              height: 'auto',
            },
          }}
        />

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 24,
              padding: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={selectedImage} alt="Large Character" style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Modal>
      {/*</div>*/}
    </Box>
  )
}