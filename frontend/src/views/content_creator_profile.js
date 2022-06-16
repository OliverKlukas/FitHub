import { Divider, Typography } from '@mui/material';
import * as React from 'react';
import {Stack} from "@mui/material";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Review from '../components/profilecomponents/reviewlist/review';
import { loremIpsum, Avatar } from 'react-lorem-ipsum';
import StarIcon from '@mui/icons-material/Star'
import ProfileDialogButtons from '../components/profilecomponents/popups/profile_dialog_buttons';


function ContentCreatorProfile(){
    

    function handleClick(){}

    return(
    <Box sx={{
        minwidth: '300',
        maxwidth: '300'
    }}>

    <Stack direction ="column" spacing={2}>


    <Stack direction="row" spacing={10}>
        <Avatar variant="rounded">

        </Avatar>
        <Stack direction="column" spacing={2}>
            <h1> Igor Something</h1>
            <Typography variant="body1" component="div" gutterBottom>
                Igor is a real chad and makes some good training my dude
            </Typography>
            <Stack direction="row" spacing={3}>
            <Rating name="read-only" value={4} readOnly icon={<StarIcon color='warning'></StarIcon>} />
            <Typography variant="caption" gutterBottom>
                512 reviews
            </Typography>
            </Stack>
        </Stack>
        <ProfileDialogButtons>
            
        </ProfileDialogButtons>
        
    </Stack>
    <Divider
        variant='fullWidth'
    >

    </Divider>
    <Box sx={{ 
                width: '90%',
              }}>
        <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2} 
              >
              {Review("Pratched", loremIpsum(),"20.06.1997","what a title",3)// replace with a map over the array from the backend //
              } 

              {Review("Pratched", loremIpsum(),"20.06.1997","You seen my dude Igor",5)}

              {Review("Karen Kardashian", loremIpsum(),"1.1.2012","If I could give 0 Stars, I would",1)}

        </Stack>  
    </Box>
    </Stack>
    </Box>
    
        

    ) 
}


export default ContentCreatorProfile;