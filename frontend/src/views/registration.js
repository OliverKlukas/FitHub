import { TextField, Stack, Box, Typography, Grid, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import { border, display, minWidth } from '@mui/system';
import * as React from 'react';
import { HighlightButton } from '../components/buttons/highlight_button';


function Registration() {
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
        >
        <Grid item xs={1} >
            <Stack direction="column" spacing={3} 
            alignItems="flexstart" >
                <Typography variant='h1'>
                    Create account
                </Typography>
                <Typography variant='h4'>
                    Your name
                </Typography>
                <Stack direction="row" spacing={5}>
                    
                    <TextField label="First Name"
                                
                    >
                    </TextField>
                    <TextField label="Last Name">

                    </TextField>
                </Stack>
                <FormControl>
                    <FormLabel id="Account_Type_Selector">Account Type</FormLabel>
                    <RadioGroup
                        aria-labelledby="Account_Type_Selector"
                        name="Account Type"
                    >
                            <FormControlLabel value="Content Creator" control={<Radio />} label="I want to upload and sell Fitness Content" />
                            <FormControlLabel value="Customer" control={<Radio />} label="I want to buy Fitness Content" />
                    </RadioGroup>
                </FormControl>
                <Typography variant='h4'>
                    Email
                </Typography>
                <TextField label="Email"
                >
                </TextField>
                <Typography variant='h4'>
                    Choose a Password
                </Typography>
                <Stack direction="row" spacing={10}>
                    <TextField label="Password"           
                    id="standard-password-input"
                    type="password"
                    variant="standard"
                    >
                    </TextField>
                    <TextField label="Repeat Password"
                    id="standard-password-input"
                    type="password"
                    variant="standard"
                    >
                    </TextField>
                </Stack>
                <TextField 
                alignItems="left"
                multiline
                minRows={5}
                maxRows={5}
                defaultValue="You can enter a short a description of yourself and the content you create, this description can always be edited through your profifle page"
                >

                </TextField>
                <HighlightButton>
                    Save and Submit
                </HighlightButton>
                <Typography variant='caption' justifyContent="center"
                alignItems="center"
                gutterBottom>
                By creating an account you agree to FitHub's Conditions of Use & Sale. 
                </Typography>
            </Stack>
        </Grid>     
    </Grid> 
    )
}

export default Registration;