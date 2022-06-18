import {Avatar, Box, Link, Rating, Stack, Typography} from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import {Link as RouterLink, useParams} from "react-router-dom";
import {content} from "../utils/content";
import {HighlightButton} from "../components/buttons/highlight_button";
import {StandardButton} from "../components/buttons/standard_button";
import {Star} from "@mui/icons-material";

/**
 * Detailed view that conveys the most important information of a content item.
 *
 * @returns {JSX.Element}
 */
export default function Details() {
    // Match url id to content item.
    let {id} = useParams();
    const item = content.find((item) => item.id == id);

    return (<Stack spacing={3} marginBottom={10} marginTop={5}>
        <Stack direction="row" justifyContent="space-between">
            <Carousel animation="slide" interval={6000} duration={1200} indicators={false}
                      navButtonsAlwaysVisible={true} height="60vh"
                      sx={{width: {xs: "100%", md: "100%", lg: "60%", xl: "60%"}, borderRadius: 5, boxShadow: 5}}>
                {item.media.map((url, index) => <img width="100%" height="100%" key={index} src={url}
                                                     style={{objectFit: "cover"}}/>)}
            </Carousel>
            <Box justifyContent="center" sx={{display: {xs: "none", md: "none", lg: "flex"}, width: "35%"}}>
                <Stack alignItems="center" justifyContent="center">
                    <Link underline="none" href={`/profile/${item.author.name}`}>
                        <Avatar sx={{
                            width: "15vw", height: "15vw", marginBottom: 3, boxShadow: 5, ":hover": {
                                opacity: 0.8, boxShadow: 15,
                            }
                        }} alt="content creator" src={item.author.img}/>
                    </Link>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}
                               marginTop={0.5} marginBottom={2}>
                            <Rating size="large" sx={{
                                "& .MuiRating-iconEmpty": {color: "info.main"},
                                "& .MuiRating-iconFilled": {color: "warning.main"}
                            }}
                                    name="read-only" value={item.author.rating} readOnly
                                    emptyIcon={<Star fontSize="inherit"/>}
                            />
                            <Link color="inherit" underline="hover" href={`/profile/${item.author.name}`}>512
                                reviews</Link>
                        </Stack>
                        <Typography variant="h1">
                            {item.author.name}
                        </Typography>
                        <Typography lineHeight={1.3}>
                            {item.author.title}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
        <Stack spacing={4} sx={{width: {xs: "100%", md: "100%", lg: "60%", xl: "60%"}}}>
            <Stack>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                    <Typography variant="h1">
                        {item.title}
                    </Typography>
                    <Typography variant="h1">
                        {item.price}€
                    </Typography>
                </Stack>
                <Stack marginBottom={2} direction="row" justifyContent="space-between" spacing={4}>
                    <Typography>
                        by <Link color="inherit" underline="hover"
                                 href={`/profile/${item.author.name}`}>{item.author.name}</Link>
                    </Typography>
                    <Typography>
                        total price
                    </Typography>
                </Stack>
                <HighlightButton variant="contained" component={RouterLink} to={`/payment/${id}`}>Buy
                    now</HighlightButton>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h3">
                    Description
                </Typography>
                <Typography>
                    {item.description}
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h3">
                    Duration
                </Typography>
                <Typography>
                    {item.duration}
                </Typography>
            </Stack>
            <Stack spacing={2}>
                <Typography variant="h3">
                    Sample Workout
                </Typography>
                <StandardButton variant="contained" component={RouterLink} target="_blank" to={"/sample.pdf"} download>
                    Download
                </StandardButton>
            </Stack>
        </Stack>
    </Stack>)
}