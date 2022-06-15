import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {HighlightButton} from "../components/buttons/highlight_button";



function Payment() {


  function handleClick(){}


  function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  
  return (
  
    <Stack spacing={2} padding="25px"> 

      <Grid item container paddingLeft="25px" paddingRight="25px" paddingBottom="25px" backgroundColor="#EEEEEE" borderRadius="8px" spacing={1} width="80%" justifyContent="flex-start">

        <Grid item xs={12}> <h1>Plan Information</h1> </Grid>

        <Grid item xs={12} className="line"></Grid>
        <Grid item xs={12} className="line"></Grid>

        <Grid item>     

          <img 
            style={{objectFit: "cover", width: "95%", height: "95%", borderRadius: "8px"}}
            {...srcset('https://images.unsplash.com/photo-1517836357463-d25dfeac3438', 250, 200)}
            alt="Bild"
          /> 

        </Grid>
      
        <Grid item xs={12} sm container >
      
          <Grid item xs={4} md={2}> Title</Grid>
          <Grid item xs={8} md={10}>12-Weeks Full-Body Workout</Grid>

          <Grid item xs={12} className="line"></Grid>
  
          <Grid item xs={4} md={2}> Content Creator</Grid>
          <Grid item xs={8} md={10}>Igor Féichín</Grid>

          <Grid item xs={12} className="line"></Grid>

          <Grid item xs={4} md={2}>Duration</Grid>
          <Grid item xs={8} md={10}>12 weeks with 3 workouts per day</Grid>

          <Grid item xs={12} className="line"></Grid>

          <Grid item xs={4} md={2}>Price</Grid>
          <Grid item xs={8} md={10}>49,99€</Grid>

        </Grid>

        <Grid item xs={12} className="line"></Grid>

        <Grid item xs={4} md={2}>Description</Grid>
        <Grid item xs={8} md={10}>
          This 12 week training plan is designed for people of all ages, that want to improve their overall fitness. 
          The plan includes daily exercises with detailed instructions, tips and recommendations for optional excercises to strengthen your stamina. There is an easy and hard variation of each exercise included, so you can adapt this plan to your fitness level. 
          No equipment is required.
        </Grid>  

        

        <Grid item xs={12} className="line"></Grid>

      </Grid>
  
      <h1>Payment Options:</h1>

      <Grid container paddingLeft="25px" backgroundColor="#EEEEEE" borderRadius="8px" left="2%" width="80%" justifyContent="flex-start">

        <Grid item>
          <FormControlLabel control={<Checkbox/>} label="PayPal" />
        </Grid>

      </Grid>

      <h1>Legal Notices:</h1>

      <Grid container paddingLeft="25px" backgroundColor="#EEEEEE" borderRadius="8px" left="2%" width="80%" justifyContent="flex-start">

        <Grid item>
          <FormControlLabel control={<Checkbox/>} label="I have read and agree to the Terms & Conditions" />
        </Grid>

      </Grid>


      <HighlightButton variant='contained' onClick={handleClick}>Buy Now</HighlightButton>
        
      
    </Stack>

  );
}

export default Payment;