import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageCard from "../components/cards/image_card";
import {Stack, Typography} from "@mui/material";
import MultipleSelectChip from "../components/filters/fitler_bar";
import FilterBar from "../components/filters/fitler_bar";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

const content = [{
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    title: '12-Weeks Full-Body Workout',
    author: 'Igor Felchin',
    featured: true,
}, {
    img: 'https://images.unsplash.com/photo-1550345332-09e3ac987658',
    title: 'Crossfit Workout Routine',
    author: 'Osanna Imbi',
}, {
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    title: 'Weight Loss Nutrition Plan',
    author: 'Calixta Tadeusz',
}, {
    img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77',
    title: '9-Weeks Cardio Plan',
    author: 'Emlyn Shaina',
}, {
    img: 'https://images.unsplash.com/photo-1521986329282-0436c1f1e212',
    title: 'Vegan Nutrition Plan',
    author: 'Ernesta Lunete',
}, {
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd',
    title: 'Powerlifting Coaching',
    author: 'Arnold Schwarzenegger',
}, {
    img: 'https://images.unsplash.com/photo-1623200216581-969d9479cf7d',
    title: 'Home Workout Routines',
    author: 'Konsuke Hardmod',
}, {
    img: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74',
    title: 'Personal Weightlifting Coaching',
    author: 'Katie Wassmann',
}, {
    img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
    title: 'Pescatarian Weight Loss Plan',
    author: 'Shelly Purdue',
    featured: true,
}, {
    img: 'https://images.unsplash.com/photo-1593476123561-9516f2097158',
    title: 'Professional Running Analysis',
    author: 'Herfeld Roman',
}, {
    img: 'https://images.unsplash.com/photo-1632781297772-1d68f375d878',
    title: '12-Weeks Weight Gain Plan',
    author: 'Simon Plashek',
}, {
    img: 'https://images.unsplash.com/photo-1590771998996-8589ec9b5ac6',
    title: 'Lower Body Training Plan',
    author: 'Susanne Friedrisch',
},];

function Discovery() {
    return (
        <Stack sx={{marginX: 6}}>
            <FilterBar/>
            <ImageList
                sx={{
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: 'translateZ(0)', overflow: 'hidden'
                }}
                cols={3}
                gap={40}
            >
                {content.map((item) => (
                    <ImageCard item={item} key={item.img}/>
                ))}
            </ImageList>
        </Stack>
        )
}

export default Discovery;