import { Backdrop, Box, Fade, IconButton, Modal as MUIModal, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
  openModal: boolean
  onCloseModal: () => void
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({openModal, onCloseModal, children}: Props) => {
  const theme = useTheme();

  return (
    <MUIModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={onCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            backgroundColor: theme.palette.background.default,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton onClick={onCloseModal} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </Fade>
    </MUIModal>
  )
}