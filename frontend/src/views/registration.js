import { TextField, Stack, Box} from '@mui/material';
import * as React from 'react';
import { HighlightButton } from '../components/buttons/highlight_button';


function Registration() {
    return (
        <Stack direction="column" >
            <Stack direction="row" spacing={10}>
                <TextField label="First Name"
                               
                >
                </TextField>
                <TextField label="Last Name">

                </TextField>
            </Stack>
            <Box>

            </Box>
            <TextField label="Email-Adress"


            >

            </TextField>
            <Stack direction="row" spacing={10}>
                <TextField label="Password">

                </TextField>
                <TextField label="Repeat Password">

                </TextField>
            </Stack>
            <TextField label="Enter a description of yourself">

            </TextField>
            <Stack direction="row" spacing={10}>
                <Box>

                </Box>
                <HighlightButton>
                Save and Submit
            </HighlightButton>
            </Stack>




        </Stack>
    )
}

export default Registration;