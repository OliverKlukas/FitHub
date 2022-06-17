import {Box, Link, Typography} from "@mui/material";
import * as React from "react";
import p404image from "./../resources/404.jpg";

/**
 * Simple 404 page not found view to guide users back to webpage in case of routing errors.
 *
 * @returns {JSX.Element} Returns 404 page.
 */
export default function PageNotFound() {
    return (<Box sx={{display: "flex", justifyContent: "center", marginTop: 3}}>
        <Link href="/">
            <Box sx={{
                position: "relative", display: "inline-block", height: "90vh", width: "90vw", ':hover': {
                    opacity: 0.8, transition: "all 0.25s",
                },
            }}>
                <img
                    style={{borderRadius: 20, objectFit: "cover"}}
                    height="100%"
                    width="100%"
                    alt="404"
                    src={p404image}
                />
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate( -50%, -50% )",
                    textAlign: "center",
                }}>
                    <Typography color="white" variant="h1" fontSize={90} fontWeight={600}>
                        Oops! 404: page not found
                    </Typography>
                    <Typography color="white" variant="h3" marginTop={2} fontSize={40} fontWeight={400}>
                        It seems that we've lost you in the gym, let us guide you back!
                    </Typography>
                </Box>
            </Box>
        </Link>
    </Box>)
}
