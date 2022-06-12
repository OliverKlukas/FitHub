import { Divider, Typography } from '@mui/material';
import * as React from 'react';
import {StandardButton} from "../components/buttons/standard_button";
import {Stack} from "@mui/material";
import {HighlightButton} from "../components/buttons/highlight_button";
import {CancelButton} from "../components/buttons/cancel_button";
import {LinkButton} from "../components/buttons/link_button";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Review from '../components/reviewlist/review';
import { loremIpsum, Avatar } from 'react-lorem-ipsum';
import { height } from '@mui/system';


function ContentCreatorProfile(){

    function handleClick(){}

    return(
    <Box sx={{
        width: '100%'
    }}>


    <Stack direction="row" spacing={10}>
        <Avatar>

        </Avatar>
        <Stack direction="column" spacing={2}>
            <h1> Igor Something</h1>
            <Typography variant="body1" component="div" gutterBottom>
                Igor is a real chad and makes some good training my dude
            </Typography>
            <Stack direction="row" spacing={3}>
            <Rating name="read-only" value={4} readOnly />
            <Typography variant="caption" gutterBottom>
                512 reviews
            </Typography>
            </Stack>
        </Stack>
        <Stack direction="column" spacing={4}>
            <StandardButton variant='contained' onClick={handleClick}>report this content creator</StandardButton>
            <HighlightButton variant='contained' onClick={handleClick}>write a review</HighlightButton>
        </Stack>
    </Stack>
    <Divider>

    </Divider>
    <Box sx={{ 
                width: '100%',
              }}>
        <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1} 
              >
              {Review("Pratched", loremIpsum(),"20.06.1997","what a title",3)}
            <Divider/>
              {Review("Pratched", loremIpsum(),"20.06.1997","You seen my dude Igor",5)}
            <Divider/>
              {Review("Karen Kardashian", loremIpsum(),"1.1.2012","If I could give 0 Stars, I would",1)}
            <Divider/>
        </Stack>  
    </Box>
    </Box>    
        

    ) 
}


export default ContentCreatorProfile;