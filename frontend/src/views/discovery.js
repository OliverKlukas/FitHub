import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageCard from "../components/cards/image_card";
import {Stack, Typography} from "@mui/material";
import MultipleSelectChip from "../components/filters/fitler_bar";
import FilterBar from "../components/filters/fitler_bar";

const content = [{
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: '12-Weeks Full-Body Workout',
    author: 'Igor Felchin',
    featured: true,
}, {
    img: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    title: 'Crossfit Workout Routine',
    author: 'Osanna Imbi',
}, {
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80',
    title: 'Weight Loss Nutrition Plan',
    author: 'Calixta Tadeusz',
}, {
    img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    title: '9-Weeks Cardio Plan',
    author: 'Emlyn Shaina',
}, {
    img: 'https://images.unsplash.com/photo-1521986329282-0436c1f1e212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    title: 'Vegan Nutrition Plan',
    author: 'Ernesta Lunete',
}, {
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Powerlifting Coaching',
    author: 'Arnold Schwarzenegger',
}, {
    img: 'https://images.unsplash.com/photo-1623200216581-969d9479cf7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Home Workout Routines',
    author: 'Konsuke Hardmod',
}, {
    img: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1294&q=80',
    title: 'Personal Weightlifting Coaching',
    author: 'Katie Wassmann',
}, {
    img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80',
    title: 'Pescatarian Weight Loss Plan',
    author: 'Shelly Purdue',
    featured: true,
}, {
    img: 'https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    title: 'Professional Running Analysis',
    author: 'Herfeld Roman',
}, {
    img: 'https://images.unsplash.com/photo-1632781297772-1d68f375d878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    title: '12-Weeks Weight Gain Plan',
    author: 'Simon Plashek',
}, {
    img: 'https://images.unsplash.com/photo-1590771998996-8589ec9b5ac6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
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
                    transform: 'translateZ(0)', overflow: 'hidden', title: {
                        fontSize: '2rem',
                    }
                }}
                rowHeight={400}
                cols={3}
                variant="quilted"
                gap='2vw'
            >
                {content.map((item) => (
                    <ImageCard item={item} key={item.img}/>
                ))}
            </ImageList>
        </Stack>
        )
}

export default Discovery;