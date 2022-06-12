import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { TextField, Typography } from '@mui/material';


export default function Review(reviewer, text, date, title, star_value){
    return(
        <Box sx={{ 
            width: '100%',
            backgroundColor: 'gray'
          }}>
            <Stack direction="row" spacing={4}>


            <Rating name="read-only" value={star_value} readOnly />
            <Typography variant="h6" component="div" gutterBottom>
                {title}
            </Typography>
            </Stack>
            <Typography variant="body2" component="div" gutterBottom>
                {text}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
                {date}
            </Typography>
        </Box>
    )

}