import * as React from 'react';
import {StandardButton} from "../components/buttons/standard_button";
import {Stack} from "@mui/material";
import {HighlightButton} from "../components/buttons/highlight_button";
import {CancelButton} from "../components/buttons/cancel_button";
import {LinkButton} from "../components/buttons/link_button";

function Discovery(){

    function handleClick(){}

    return(
        <Stack>
            <h1>DISCOVERY VIEW</h1>
            <Stack direction="row" spacing={4}>
                <StandardButton variant='contained' onClick={handleClick}>Standard</StandardButton>
                <HighlightButton variant='contained' onClick={handleClick}>Highlight</HighlightButton>
                <CancelButton variant='contained' onClick={handleClick}>Cancel</CancelButton>
                <LinkButton variant='text' onClick={handleClick}>I'm a link!</LinkButton>
            </Stack>
        </Stack>
    )
}

export default Discovery;