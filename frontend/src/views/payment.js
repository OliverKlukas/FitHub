import * as React from 'react';
import {Box, FormControlLabel, Checkbox, Grid, Divider, Stack, Typography} from "@mui/material";
import {Link as RouterLink, useParams} from "react-router-dom";
import {HighlightButton} from "../components/buttons/highlight_button";
import {content} from "../utils/content";


/**
 * Payment page with the most important information AGBs and payment method selection.
 *
 * @returns {JSX.Element} Returns payment page.
 */


function Payment() {

  // Match url id to content item.
  let {id} = useParams();
  const item = content.find((item) => item.id == id);


  function handleClick(){}


  function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  
  return (
  
    <Stack spacing={3} marginBottom={10} marginTop={5} alignItems="center">

      <Stack padding={5} backgroundColor="#EEEEEE" sx={{width: {xs: "100%", md: "100%", lg: "80%", xl: "60%"}, borderRadius: 5, boxShadow: 5}}>

        <Typography variant="h1">
          {item.title}
        </Typography>

        <Divider sx={{mt: 3, bgcolor: "#222831"}}/>
    
        <Divider sx={{mt: 1, mb: 3, bgcolor: "#222831"}}/>

        <Stack direction="row" spacing={3}>

          <Box sx={{ display: { xs: 'none', md: 'block' }}}>

            <img 
                style={{borderRadius: "8px"}}
                {...srcset(item.img, 300, 220)}
                alt="Bild"
              />        
                
          </Box>

          <Box sx={{ width: '100%' }}>

          <Stack>

            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4}>

              <Typography variant="h3">
                Title
              </Typography>

              <Typography variant="h4">

                {item.title}
              </Typography>

            </Stack>

            <Divider sx={{my: 2, bgcolor: "#222831"}}/>

            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4}>

              <Typography variant="h3">
                Content Creator
              </Typography>

              <Typography variant="h4">
                {item.author.name}
              </Typography>

            </Stack>

            <Divider sx={{my: 2, bgcolor: "#222831"}}/>

            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4}>
              <Typography variant="h3">
                Duration
              </Typography>

              <Typography variant="h4">            
                {item.duration}
              </Typography>

            </Stack>

            <Divider sx={{my: 2, bgcolor: "#222831"}}/>

            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4}>
              <Typography variant="h3">
                Price
              </Typography>

              <Typography variant="h4">            
                {item.price}€
              </Typography>

            </Stack>

            <Divider sx={{mt: 2, mb: 0, bgcolor: "#222831"}}/>         

          </Stack>

          </Box>            

        </Stack>

        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4} sx={{mt: 2, ml:{xs: 3, md: 0}}}>
              <Typography variant="h3">
                Description
              </Typography>

              <Typography variant="h4">            
                {item.description}
              </Typography>

            </Stack>

            <Divider sx={{mt: 3, ml:{xs: 3, md: 0}, bgcolor: "#222831"}}/> 

      </Stack>

      <Box alignItems="flex-start" sx={{width: {xs: "100%", md: "100%", lg: "80%", xl: "60%"}}}>
        <Typography variant="h2">
          Payment Options:
        </Typography>
      </Box>  

      <Stack paddingLeft={3} backgroundColor="#EEEEEE" sx={{width: {xs: "100%", md: "100%", lg: "80%", xl: "60%"}, borderRadius: 2, boxShadow: 5}}>
        <FormControlLabel control={<Checkbox/>} label="PayPal" />
      </Stack>

      <Box alignItems="flex-start" sx={{width: {xs: "100%", md: "100%", lg: "80%", xl: "60%"}}}>
        <Typography variant="h2">
          Legal Notices:
        </Typography>
      </Box>  

      <Stack paddingLeft={3} direction="row" alignItems="center" backgroundColor="#EEEEEE" sx={{width: {xs: "100%", md: "100%", lg: "80%", xl: "60%"}, borderRadius: 2, boxShadow: 5}}>

        <FormControlLabel control={<Checkbox/>}/>

        <Typography>
          I have read and agree to the 
        </Typography>

        <Typography component={RouterLink} to={`/terms`} paddingLeft={0.5}>
          Terms & Conditions
        </Typography>

      </Stack>

      <HighlightButton variant='contained' onClick={handleClick}>Buy Now</HighlightButton>      
      
    </Stack>

  );
}

export default Payment;