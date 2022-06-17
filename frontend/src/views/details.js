import {Avatar, Link, Rating, Stack, Typography} from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import {Link as RouterLink, useParams} from "react-router-dom";
import {content} from "../utils/content";
import {HighlightButton} from "../components/buttons/highlight_button";
import {StandardButton} from "../components/buttons/standard_button";
import StarIcon from '@mui/icons-material/Star';

export default function Details() {
    // Match url id to content item.
    let {id} = useParams();
    const item = content.find((item) => item.id == id);

    let ratings = [];
    const reviews = [1, 2, 3, 4, 5];
    for(let item of reviews){
        ratings.push(item.star)
    }


    return (<Stack spacing={3} marginBottom={10} marginTop={6}>
        <Stack direction="row">
            <Carousel animation="slide" interval={6000} duration={1200} indicators={false}
                      navButtonsAlwaysVisible={true} height="60vh"
                      sx={{width: {xs: "100%", md: "100%", lg: "60%", xl: "60%"}, borderRadius: 5}}>
                {item.media.map((url, index) => <img width="100%" height="100%" key={index} src={url}
                                                     style={{objectFit: "cover"}}/>)}
            </Carousel>
            <Stack>
                <Avatar variant="circular"/>
                <Stack direction="column" spacing={2}>
                    <h1>{item.author}</h1>
                    <Typography variant="body1" sx={{
                        width: "60%"
                    }} gutterBottom>
                        TODO description
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Rating name="read-only" value={ratings.reduce((p, c) => {
                            return (p + c)
                        }) / reviews.length} readOnly icon={<StarIcon color='warning'></StarIcon>}/>
                        {/* Calucaltes the average rating of all reviews, there are countless other ways to calculate this, using reduce, needs a numbers array, hence the ratings array */}
                        <Typography variant="caption">
                            {reviews.length} reviews
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
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
                                 href={`/profile/${item.author}`}>{item.author}</Link>
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
                    This 12 weeks training plan is designed for people of all ages, that want to improve their
                    overall fitness. This 12 weeks training plan is designed for people of all ages, that want to
                    improve their overall fitness.
                    The plan includes daily exercises with detailed instructions, tips and recommendations for
                    optional excercises to strengthen your stamina. The plan includes daily exercises with detailed
                    instructions, tips and recommendations for optional excercises to strengthen your stamina. There
                    is an easy and hard variation of each exercise included, so you can adapt this plan to your
                    fitness level.
                    No equipment is required. No equipment is required. No equipment is required.
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h3">
                    Duration
                </Typography>
                <Typography>
                    12 weeks with daily workouts and 96 different exercises.
                </Typography>
            </Stack>
            <Stack spacing={2}>
                <Typography variant="h3">
                    Sample Workout
                </Typography>
                <StandardButton variant="contained" component={RouterLink} target="_blank" to={"/sample.pdf"}
                                download>
                    Download
                </StandardButton>
            </Stack>
        </Stack>
    </Stack>)
}