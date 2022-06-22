import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'



export default function Review(reviewer, text, date, title, star_value){
    return(
        <Box sx={{ 
            width: '100%',
            backgroundColor: '#EEEEEE',
            alignment: 'right',
            borderRadius: '12px'
          }}>
            <Stack direction="row" spacing={4}>


            <Rating name="read-only" value={star_value} readOnly icon={<StarIcon color='warning'></StarIcon>}/>
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