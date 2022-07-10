import { Stack, Typography } from "@mui/material";
import * as React from "react";
import { HighlightButton } from "../../components/buttons/highlight_button";
import { StandardButton } from "../../components/buttons/standard_button";
import { Link as RouterLink } from "react-router-dom";

/**
 * get image src path.
 *
 * Adapted from: https://mui.com/material-ui/react-image-list/#CustomImageList.js
 *
 * @param image - String path to image resource.
 * @param width - Number desired width of image.
 * @param height - Number desired height of image.
 * @returns {{src: string}} - Returns src variable for img.
 */
function srcset(image, width, height) {
    return {
        src: `${image}?w=${width}&h=${height}&fit=crop&auto=format`,
    };
}

/**
 * my plans view content component including an overview of price, content creator, a download button, a review button that links to the content creators profile and a customer support button.
 *
 * @param item - To be displayed content item, expected to adhere to the database scheme of content.
 * @returns {JSX.Element} - Returns content item that will be displayed in the myplans view.
 */
export default function OffContent({ item }) {
    // fixed image width and height for the my plans view
    const imgWidth = 200;
    const imgHeight = 200;

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            padding={2}
            spacing={2}
            justifyContent="space-between"
            backgroundColor="#EEEEEE"
            sx={{
                borderRadius: 5,
                boxShadow: 5,
                width: { xs: "100%", lg: "90%", xl: "80%" },
            }}
        >
            <Stack direction="row" spacing={2}>
                <img style={{ borderRadius: "10px" }} {...srcset(item.img, imgWidth, imgHeight)} alt={item.title} />
                <Stack justifyContent="space-between">
                    <Stack spacing={2}>
                        <Typography variant="h2">{item.title}</Typography>
                        <Typography variant="h3">Price: {item.price} €</Typography>
                    </Stack>
                    <Stack spacing={2}>
                        <Typography variant="h4">{item.duration}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack justifyContent="space-between" spacing={2}>
                <StandardButton variant="contained" sx={{ width: 300 }} component={RouterLink} target="_blank" to={"/sample.pdf"} download>
                    Download
                </StandardButton>
                <StandardButton variant="contained" sx={{ width: 300 }} component={RouterLink} to={"/"}>
                    Update 
                </StandardButton>
                <HighlightButton variant="contained" sx={{ width: 300 }} component={RouterLink} to={"/"}>
                    Delete 
                </HighlightButton>
            </Stack>
        </Stack>
    );
}
