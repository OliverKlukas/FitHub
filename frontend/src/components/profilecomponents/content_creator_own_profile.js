import { Divider, Typography, useThemeProps } from '@mui/material';
import * as React from 'react';
import { Stack, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Review from './reviewlist/review';
import { Avatar } from 'react-lorem-ipsum';
import StarIcon from '@mui/icons-material/Star';
import { HighlightButton } from '../buttons/highlight_button';
import UploadButton from '../buttons/upload_button';


function ContentCreatorOwnProfile({name, description, reviews}) {

    const [picture, setPicture] = React.useState("")

    const [changedDescription, setDescription] = React.useState("")


    function handleClick() { }

    const ratings = []
    for (let item of reviews) {
        ratings.push(item.star)
    }
    return (
        <Box sx={{
            minwidth: '300',
            maxwidth: '300'
        }}>


            <Stack direction="column" spacing={2}>

                <Stack direction="row" spacing={10}>
                    <Avatar variant="circular">

                    </Avatar>
                    <Stack direction="column" spacing={2}>
                        <h1>{name}</h1>
                        <TextField
                            id='outlined-basic'
                            label="Edit Description and Update to save"
                            variant="outlined"
                            multiline
                            minRows={5}
                            maxRows={5}
                            defaultValue={description}
                            sx={{
                                width: '150%',
                            }}>
                        </TextField>
                        <Stack direction="row" spacing={3}>
                            <Rating name="read-only" value={ratings.reduce((p, c) => { return (p + c) }) / reviews.length} readOnly icon={<StarIcon color='warning'></StarIcon>} />
                            {/* Calucaltes the average rating of all reviews, there are countless other ways to calculate this, using reduce, needs a numbers array, hence the ratings array */}
                            <Typography variant="caption" >
                                {reviews.length} reviews
                            </Typography>
                            <HighlightButton>
                                Update
                            </HighlightButton>
                        </Stack>
                    </Stack>
                </Stack>
                    <UploadButton id="markting-upload" uploadFormat="image/*" givenId="marketing-upload" multiUpload={false}  />
                <Divider
                    variant='fullWidth'
                >

                </Divider>
                <Box sx={{
                    width: '90%',
                }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        {reviews.map((review) => {
                            return (
                                Review(review.author, review.text, review.date, review.title, review.star)
                            )
                        }
                        )
                        }
                        {/* maps over the reviews array, returns a review component for each review*/}
                    </Stack>
                </Box>
            </Stack>
        </Box>



    )
}


export default ContentCreatorOwnProfile;