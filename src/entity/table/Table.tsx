import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Modal } from '@components/modal/Modal.tsx';
import { useTable } from '@/entity/table/useTable.ts';
export const Table = () => {

  const {onResetSettings, onFilterChange, onSortChange, handleCloseModal, handleImageClick, rows,
    sortModel, filterModel, isLoading, selectedImage, openModal, characterList} = useTable()

  console.log(characterList);
  if (isLoading) {
    return <CircularProgress color="success" />
  }

  if(!characterList) {
    return <Typography variant="h6">Empty data</Typography>
  }

  const columns: GridColDef[] = [
    { field: 'id',
      type: 'number',
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
      type: 'string',
      headerName: 'Image',
      width: 150,
      sortable: false,
      filterable: false,
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
      type: 'string',
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
      type: 'string',
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
      type: 'date',
      width: 200,
      sortable: true,
      valueGetter: (params: string) => new Date(params),
      renderCell: (params: GridCellParams) => (
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
      type: 'number',
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