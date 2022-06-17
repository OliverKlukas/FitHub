import {Stack, Typography} from "@mui/material";
import {Link as RouterLink, useParams} from "react-router-dom";
import {content} from "../utils/content";
import {HighlightButton} from "../components/buttons/highlight_button";
import {StandardButton} from "../components/buttons/standard_button";

export default function Details() {
    // Match url id to content item.
    let {id} = useParams();
    const item = content.find((item) => item.id == id);

    // Handle download of content sample.
    function handleDownload(){

    }

    return (
        <Stack spacing={4} width="60%">
            <Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h1">
                        {item.title}
                    </Typography>
                    <Typography variant="h1">
                        {item.price}€
                    </Typography>
                </Stack>
                <Stack marginBottom={2} direction="row" justifyContent="space-between">
                    <Typography>
                        by {item.author}
                    </Typography>
                    <Typography>
                        total price
                    </Typography>
                </Stack>
                <HighlightButton variant="contained" component={RouterLink} to={`/payment/${id}`}>Buy now</HighlightButton>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h3">
                    Description
                </Typography>
                <Typography>
                    This 12 weeks training plan is designed for people of all ages, that want to improve their overall fitness. This 12 weeks training plan is designed for people of all ages, that want to improve their overall fitness.
                    The plan includes daily exercises with detailed instructions, tips and recommendations for optional excercises to strengthen your stamina. The plan includes daily exercises with detailed instructions, tips and recommendations for optional excercises to strengthen your stamina. There is an easy and hard variation of each exercise included, so you can adapt this plan to your fitness level.
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
                <StandardButton variant="contained" component={RouterLink} target="_blank" to={"/sample.pdf"} download>
                    Download
                </StandardButton>
            </Stack>
        </Stack>)
}