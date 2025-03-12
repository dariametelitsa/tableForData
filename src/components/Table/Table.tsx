import { useEffect, useState } from 'react';
import { apiData } from '@/api/api.ts';
import { CharacterListDTO } from '@/api/types.ts';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export const Table = () => {

  const [characters, setCharacters] = useState<CharacterListDTO>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  console.log('characters', characters);

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Typography variant="h4" gutterBottom>
        Character List
      </Typography>
      <Grid container spacing={4}>
        {characters.map((character) => (
          <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={character.image}
                alt={character.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> {character.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Species:</strong> {character.species}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Gender:</strong> {character.gender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Origin:</strong> {character.origin.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {character.location.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}