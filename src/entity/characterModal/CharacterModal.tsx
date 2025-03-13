import { useCharacter } from './useCharacter.ts';
import { Box, Divider, Grid2, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { Modal } from '@/components';

type Props = {
  openModal: boolean
  onCloseModal: () => void
  selectedCharacter: number
}

export const CharacterModal = ({openModal, onCloseModal, selectedCharacter}: Props) => {
  const { character } = useCharacter(selectedCharacter)

  if (!character) {
    return null
  }

  return (
    <Modal openModal={openModal} onCloseModal={onCloseModal}>
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
    </Modal>
  )
}