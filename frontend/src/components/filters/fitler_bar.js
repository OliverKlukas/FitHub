import * as React from 'react';
import {Button, Chip, Grid, Stack} from "@mui/material";
import SlideFilter from "./slide_filter";
import SearchFilter from "./search_filter";

const category = ['training plan', 'nutrition plan', 'coaching']
const fitnessGoal = ['weight-loss', 'weight-gain', 'muscle-growth', 'cardio']
const fitnessLevel = ['beginner', 'advanced', 'professional']
const lifestyle = ['vegan', 'vegetarian', 'pescatarian', 'meat-based']
const contentCreator = ['Igor Felchin', 'Osanna Imbi', 'Calixta Tadeusz', 'Emlyn Shaina', 'Ernesta Lunete', 'Arnold Schwarzenegger', 'Konsuke Hardmod', 'Katie Wassmann', 'Shelly Purdue', 'Herfeld Roman', 'Simon Plashek', 'Susanne Friedrisch'];

/**
 * Filter bar that bundles all sub-filters into one component.
 *
 * @param filter - Unified String[] of tags that the discovery view should be filtered for.
 * @param setFilter - Hook set function for the filter String[].
 * @param priceRange - Number[lower price limit, higher price limit] filter hook for the price filtering.
 * @param setPriceRange - Hook set function for the price.
 * @returns {JSX.Element} - Returns filter component.
 */
export default function FilterBar({filter, setFilter, priceRange, setPriceRange}) {

    // Deletes a String[] tags from the current set of applied filter
    function deleteFilter(tags) {
        setFilter(filter => filter.filter(tag => !tags.includes(tag)));
    }

    // Adds a String[] tags from the current set of applied filter.
    function addFilter(tags) {
        setFilter(filter => filter.concat(tags));
    }

    // Deletes all tags from current filter.
    function deleteAllFilter() {
        setFilter([]);
        setPriceRange([0, 100]);
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
                    <SearchFilter title="Fitness Goal" tags={fitnessGoal} addFilter={addFilter}
                                  deleteFilter={deleteFilter} globalFilter={filter}/>
                </Grid>
                <Grid item>
                    <SearchFilter title="Fitness Level" tags={fitnessLevel} addFilter={addFilter}
                                  deleteFilter={deleteFilter} globalFilter={filter}/>
                </Grid>
                <Grid item>
                    <SearchFilter title={"Lifestyle"} tags={lifestyle} addFilter={addFilter}
                                  deleteFilter={deleteFilter} globalFilter={filter}/>
                </Grid>
                <Grid item>
                    <SlideFilter priceRange={priceRange} setPriceRange={setPriceRange}/>
                </Grid>
                <Grid item>
                    <SearchFilter title={"Creator"} tags={contentCreator} addFilter={addFilter}
                                  deleteFilter={deleteFilter} globalFilter={filter}/>
                </Grid>
            </Grid>
        </Stack>
        {filter.length > 0 && <Grid container alignItems="center">
            <Grid item>
                <h4 style={{marginRight: "10px"}}>Selected Filters:</h4>
            </Grid>
            {filter.map((tag) => (
                <Grid item><Chip sx={{ml: 1}} key={tag} label={tag} onDelete={() => deleteFilter([tag])}/></Grid>))}
            <Grid item>
                <Button sx={{ml: 2}} variant="text" onClick={deleteAllFilter}>
                    delete all
                </Button>
            </Grid>
        </Grid>}
    </Stack>);
}
