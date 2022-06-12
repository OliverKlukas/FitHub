import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Review from './review';
import { loremIpsum, Avatar } from 'react-lorem-ipsum';
import { Divider } from '@mui/material';
import { height } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
  return (
    <Box sx={{ 
        width: '100%',
        backgroundColor: 'blue'
      }}>
      <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1} 
      >
      {Review("Pratched", loremIpsum(),"20.06.1997","what a title",3)}
      <Divider/>
      {Review("Pratched", loremIpsum(),"20.06.1997","what a title",3)}
      <Divider/>
      {Review("Pratched", loremIpsum(),"20.06.1997","what a title",4)}
      <Divider/>
      </Stack>  
    </Box>
  );
}
