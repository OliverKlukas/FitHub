import { Divider } from '@mui/material';
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


    <Stack>
        <h1>DISCOVERY VIEW</h1>
        <Stack direction="row" spacing={4}>
            <StandardButton variant='contained' onClick={handleClick}>Standard</StandardButton>
            <HighlightButton variant='contained' onClick={handleClick}>Highlight</HighlightButton>
            <CancelButton variant='contained' onClick={handleClick}>Cancel</CancelButton>
            <LinkButton variant='text' onClick={handleClick}>I'm a link!</LinkButton>
        </Stack>
    </Stack>
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
              {Review("Pratched", loremIpsum(),"20.06.1997","what a title",3)}
            <Divider/>
              {Review("Pratched", loremIpsum(),"20.06.1997","what a title",4)}
            <Divider/>
        </Stack>  
    </Box>
    </Box>    
        

    ) 
}


export default ContentCreatorProfile;