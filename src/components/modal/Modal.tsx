import { Box, Modal as MUIModal, useTheme  } from '@mui/material';

type Props = {
  openModal: boolean
  handleCloseModal: () => void
  selectedImage: string
}

export const Modal = ({openModal, handleCloseModal, selectedImage}: Props) => {
  const theme = useTheme();

  return (
    <MUIModal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '70%',
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          boxShadow: 24,
          padding: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={selectedImage} alt="Large Character" style={{ width: 'auto', height: '100%' }} />
      </Box>
    </MUIModal>
  )
}