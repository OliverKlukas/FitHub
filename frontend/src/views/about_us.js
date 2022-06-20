import * as React from 'react';
import { Grid , Stack, Typography} from '@mui/material';

function AboutUs() {
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        >
            <Grid item xs={1} >
                <Stack direction="column" spacing={3} 
            alignItems="center" maxWidth={1400}>
                    <Typography variant='h1'>
                        Business Idea
                    </Typography>
                    <Typography variant='h4'>
                        FitHub is the platform where fitness content creators sell their training and nutrition plans to fitness enthusiasts and health-conscious consumers. 
                    </Typography>
                    <Typography variant='h1'>
                        Who are we?
                    </Typography>
                    <Typography variant='h4'>
                        We are a team of four Information Systems Students from the Technical University of Munich. This Application was created as part of the SEBA Master Web Application Engineering Course.
                    </Typography>
                    <Typography variant='h1'>
                        What do we do?
                    </Typography>
                    <Typography variant='h4'>
                        We provide Fitness Content Creators and Fitness interested Customers with a Platform, where they can directly sell/buy content.
                        By providing a trustworthy payment scheme, transparent review system and intuitive filtering both content creators and customers are encouraged to use our Platform
                    </Typography>
                    <Typography variant='h1'>
                        Warning
                    </Typography>
                    <Typography variant='h4'>
                        This is not a actual Platform but rather just a fully functional proof of concept. All code is the shared inttellectual property of the four aformentioned Teammembers.
                        The Application is not licensed and any transactions done using the PayPal Payment System will be send to a developer account and refunded. The Content and Content Creators are mocked.
                    </Typography>



                </Stack>
            </Grid>     
        </Grid> 
    )
}

export default AboutUs;