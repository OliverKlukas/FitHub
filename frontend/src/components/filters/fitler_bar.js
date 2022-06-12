import * as React from 'react';
import {Button, Chip, Grid, Stack, Typography} from "@mui/material";
import SlideFilter from "./slide_filter";
import SearchFilter from "./search_filter";

const category = ['training plan', 'nutrition plan', 'coaching']

const fitness_goal = ['weight-loss', 'weight-gain', 'muscle-growth', 'cardio']

const fitness_level = ['beginner', 'advanced', 'professional']

const lifestyle = ['vegan', 'vegetarian', 'pescatarian']

const content_creator = ['Igor Felchin', 'Osanna Imbi', 'Calixta Tadeusz', 'Emlyn Shaina', 'Ernesta Lunete', 'Arnold Schwarzenegger', 'Konsuke Hardmod', 'Katie Wassmann', 'Shelly Purdue', 'Herfeld Roman', 'Simon Plashek', 'Susanne Friedrisch'];

export default function FilterBar({filter, setFilter}) {

    /**
     * Deletes a list of String tags from the current set of applied filter.
     *
     * @param tags - String[]
     */
    function deleteFilter(tags) {
        setFilter(filter => filter.filter(tag => !tags.includes(tag)));
    }

    /**
     * Adds a list of String tags from the current set of applied filter.
     *
     * @param tags - String[]
     */
    function addFilter(tags) {
        setFilter(filter => filter.concat(tags));
    }

    /**
     * Deletes all tags from the current filter.
     */
    function deleteAllFilter() {
        setFilter([]);
    }

    return (<Stack>
            <Stack direction="row" spacing={2}>
                <h4>Filters:</h4>
                <Grid container>
                    <Grid item>
                        <SearchFilter title="Category" tags={category} addFilter={addFilter} deleteFilter={deleteFilter}
                                      globalFilter={filter}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title="Fitness Goal" tags={fitness_goal} addFilter={addFilter}
                                      deleteFilter={deleteFilter} globalFilter={filter}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title="Fitness Level" tags={fitness_level} addFilter={addFilter}
                                      deleteFilter={deleteFilter} globalFilter={filter}/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title={"Lifestyle"} tags={lifestyle} addFilter={addFilter}
                                      deleteFilter={deleteFilter} globalFilter={filter}/>
                    </Grid>
                    <Grid item>
                        <SlideFilter/>
                    </Grid>
                    <Grid item>
                        <SearchFilter title={"Creator"} tags={content_creator} addFilter={addFilter}
                                      deleteFilter={deleteFilter} globalFilter={filter}/>
                    </Grid>
                </Grid>
            </Stack>
            {filter.length > 0 && <Stack direction="row" alignItems="center">
                <h4 style={{marginRight: "10px"}}>Selected Filters:</h4>
                {filter.map((tag) => (<Chip sx={{ml: 1}} key={tag} label={tag} onDelete={() => deleteFilter([tag])}/>))}
                <Button sx={{ml: 2}} variant="text" onClick={deleteAllFilter}>
                    delete all
                </Button>
            </Stack>}
        </Stack>);
}
