import {Stack, Grid, Typography} from "@mui/material";
import * as React from "react";
import {HighlightButton} from "../../components/buttons/highlight_button"
import {StandardButton} from "../../components/buttons/standard_button";
import {Link as RouterLink} from "react-router-dom";

/**
 * Single content my plans view component including an overview of price, content creator, a download button, a review button that links to the content creators profile and a customer support button.
 *
 * @param item - To be displayed content item, expected to adhere to the database scheme of content.
 * @returns {JSX.Element} - Returns ImageListItem.
 */
export default function Plan({item}) {

    function srcset(image, width, height, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const imgWidth = 250;
    const imgHeight = 200;

    return (
        <Stack>   
            <Grid container spacing={2}>
                <Grid item>
                    <img
                        style={{borderRadius: "10px"}}
                        {...srcset(item.img, imgWidth, imgHeight)}
                        alt={item.title}
                    />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item justifyContent="space-between" xs container direction="column" spacing={2} >
                        <Grid item xs>
                            <Typography variant="h2" >
                                {item.title}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" gutterBottom>
                                {item.author.name}
                            </Typography>
                            <Typography variant="h4">
                                {item.author.rating}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item justifyContent="space-between" xs container direction="column" spacing={2} >
                        <Grid item>
                            <HighlightButton variant='contained' component={RouterLink} target="_blank" to={"/sample.pdf"} download>Download</HighlightButton>  
                        </Grid>
                        <Grid item>
                            <StandardButton variant="contained" component={RouterLink} to={`/discovery`}>Contact customer support</StandardButton>
                        </Grid>
                        <Grid item>
                            <StandardButton variant="contained" component={RouterLink} to={`/discovery`}>Write a review</StandardButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
  
    );
}
