import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Modal } from '@components/modal/Modal.tsx';
import { useTable } from '@/entity/table/useTable.ts';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const Table = () => {

  const {onResetSettings, onFilterChange, onSortChange, onCloseModal, onImageClick, rows,
    sortModel, filterModel, isLoading, selectedCharacter, openModal, characterList} = useTable()

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
      width: 70,
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
      renderCell: (params: GridCellParams) => {
        const id = params.row.id
        return(
          <img
            src={params.value as string}
            alt="Character"
            style={{ width: '90px', height: 'auto', cursor: 'pointer' }}
            onClick={() => onImageClick(id)}
          />
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      width: 250,
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
      field: 'gender',
      headerName: 'Gender',
      type: 'singleSelect',
      valueOptions: ['Female', 'Male', 'Genderless', 'unknown'],
      width: 100,
      filterable: true,
      renderCell: (params: GridCellParams) => (
        <>
          {params.value === 'Female'
            ? <FemaleIcon/>
            : params.value === 'Male'
            ? <MaleIcon/>
              : params.value === 'Genderless'
            ? <TransgenderIcon/>
                : <QuestionMarkIcon/>
          }
        </>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'singleSelect',
      valueOptions: ['Alive', 'Dead', 'unknown'],
      width: 120,
      filterable: true,
      renderCell: (params: GridCellParams) => (
        <Typography
          color={
            params.value === 'Alive'
              ? 'primary'
              : params.value === 'Dead'
                ? 'error'
                : 'textDisabled'
          }
          sx={{fontFamily: 'Verdana' }}>
          {params.value as string}
        </Typography>
      ),
    },
    {
      field: 'created',
      headerName: 'Created',
      type: 'date',
      width: 120,
      sortable: true,
      valueGetter: (params: string) => new Date(params),
      renderCell: (params: GridCellParams) => (
        <Typography
          color={'textSecondary'}
          sx={{ fontStyle: 'italic' }}>
          {new Date(params.value as string).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'episodeCount',
      headerName: 'Episodes Count',
      type: 'number',
      width: 150,
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
    <Box sx={{ width: '100%', marginTop: 2, marginBottom: 4 }}>
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
          paddingTop: '10px',
          '.MuiDataGrid-cell': {
            maxHeight: '300px',
            minHeight: '100px',
            overflow: 'scroll',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
          },
        }}
        sortModel={sortModel}
        onSortModelChange={onSortChange}
        filterModel={filterModel}
        onFilterModelChange={onFilterChange}
      />
      {selectedCharacter && <Modal onCloseModal={onCloseModal} openModal={openModal} selectedCharacter={selectedCharacter} />}
    </Box>
  )
}

export default Table