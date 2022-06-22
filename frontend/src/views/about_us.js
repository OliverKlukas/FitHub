import * as React from 'react';
import { Grid , Stack, Typography} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const members = [{
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    name: 'Maximilian Schumergruber',

},{
    img: 'https://images.unsplash.com/photo-1550345332-09e3ac987658',
    name: 'Simon Vogl',
}, {
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    name: 'Oliver Klukas',
}, {
    img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77',
    name: 'Johannes Loebbecke',
    
}
]

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
                    <ImageList sx={{ width: '80%', }} cols={4}>
                        {members.map((item) => (
                            <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.name}
                                position="below"
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
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