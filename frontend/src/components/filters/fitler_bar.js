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
    const [nrFilter, setNrFilter] = useState(2);

    const handleDelete = deleteTag => () => {
        setFilter(filter.filter(tag => tag !== deleteTag));
        setNrFilter(nrFilter-1);
    }

    function addFilter(tag) {
        if (filter.indexOf(tag) === -1){
            setFilter(filter => filter.concat(tag));
            setNrFilter(nrFilter+1);
        }
    }

    function deleteFilter() {
        setFilter([]);
        setNrFilter(0);
    }

    return(
        <Stack>
            <Stack direction="row" spacing={2}>
                <h4>Filters:</h4>
                <Grid container>
                    <Grid item>
                        <SearchFilter title="Category" tags={category} addFilter={addFilter}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title="Fitness Goal" tags={fitness_goal} addFilter={addFilter}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title="Fitness Level" tags={fitness_level} addFilter={addFilter}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title={"Lifestyle"} tags={lifestyle} addFilter={addFilter}/>
                    </Grid>
                    <Grid item>
                        <SlideFilter/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title={"Creator"} tags={content_creator} addFilter={addFilter}/>
                    </Grid>
                </Grid>
            </Stack>
            <Stack direction="row" alignItems="center">
                <h4>Selected Filters:</h4>
                {filter.map((tag) => (
                    <Chip sx={{ml:1}} key={tag} label={tag} onDelete={handleDelete(tag)} />
                ))}
                {nrFilter > 0 && <Button variant="text" onClick={deleteFilter}>
                    delete all
                </Button>}
            </Stack>
        </Stack>
    );
}
