import * as React from 'react';
import {Button, Chip, Grid, Stack, Typography} from "@mui/material";
import SlideFilter from "./slide_filter";
import SearchFilter from "./search_filter";
import {useState} from "react";
import {LinkButton} from "../buttons/link_button";


const category = [
    'training plan',
    'nutrition plan',
    'coaching'
]

const fitness_goal = [
    'weight-loss',
    'weight-gain',
    'muscle-growth',
    'cardio'
]

const fitness_level = [
    'beginner',
    'advanced',
    'professional'
]

const lifestyle = [
    'vegan',
    'vegetarian',
    'pescatarian'
]

const content_creator = [
    'Igor Felchin',
    'Osanna Imbi',
    'Calixta Tadeusz',
    'Emlyn Shaina',
    'Ernesta Lunete',
    'Arnold Schwarzenegger',
    'Konsuke Hardmod',
    'Katie Wassmann',
    'Shelly Purdue',
    'Herfeld Roman',
    'Simon Plashek',
    'Susanne Friedrisch'
];

export default function FilterBar(){

    const [filter, setFilter] = useState(["test", "test2"]);

    function handleDelete(chip) {
        console.log(chip.key)
        console.log(chip.label)
        setFilter(filter.filter(tag => tag != chip.key))
    }

    function deleteFilter() {
        setFilter([]);
    }

    return(
        <Stack>
            <Stack direction="row" spacing={2}>
                <h4>Filters:</h4>
                <Grid container>
                    <Grid item>
                        <SearchFilter title="Category" tags={category}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title="Fitness Goal" tags={fitness_goal}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title="Fitness Level" tags={fitness_level}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title={"Lifestyle"} tags={lifestyle}/>
                    </Grid>
                    <Grid item>
                        <SlideFilter/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title={"Creator"} tags={content_creator}/>
                    </Grid>
                </Grid>
            </Stack>
            <Stack direction="row" alignItems="center">
                <h4>Selected Filters:</h4>
                {filter.map((tag) => (
                    <Chip sx={{ml:1}} key={tag} label={tag} onDelete={handleDelete} />
                ))}
                <Button variant="text" onClick={deleteFilter}>
                    delete all
                </Button>
            </Stack>
        </Stack>
    );
}
