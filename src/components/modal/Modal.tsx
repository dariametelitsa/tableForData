import {
  Backdrop,
  Box, Divider,
  Fade,
  Grid2,
  IconButton,
  Modal as MUIModal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCharacter } from '@/entity/table/useCharacter.ts';

type Props = {
  openModal: boolean
  onCloseModal: () => void
  selectedCharacter: number
}

export const Modal = ({openModal, onCloseModal, selectedCharacter}: Props) => {
  const theme = useTheme();
  const { character } = useCharacter(selectedCharacter)

  if (!character) {
    return null
  }

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

          <Typography variant="h4" gutterBottom>
            {character.name}
          </Typography>
          <Divider />
          <Grid2 container spacing={2} sx={{ height: "100%", mt: 2 }}>
            <Grid2 component="div">
              <img
                src={character.image}
                alt={character.name}
                style={{ width: "100%", height: "auto", borderRadius: 8, objectFit: 'contain' }}
              />
            </Grid2>

            <Grid2 component="div" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Box sx={{ p: 2, width: "100%", overflow: "auto" }}>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell><b>Status:</b></TableCell>
                      <TableCell>{character.status}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Species:</b></TableCell>
                      <TableCell>{character.species}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Type:</b></TableCell>
                      <TableCell>{character.type || "Unknown"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Gender:</b></TableCell>
                      <TableCell>{character.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Origin:</b></TableCell>
                      <TableCell>{character.origin.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Last Location:</b></TableCell>
                      <TableCell>{character.location.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Episodes:</b></TableCell>
                      <TableCell>{character.episode.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Created:</b></TableCell>
                      <TableCell>{new Date(character.created).toLocaleDateString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Fade>
    </MUIModal>
  )
}