import * as React from "react";
import { useState } from "react";
import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import SlideFilter from "./slide_filter";
import SearchFilter from "./search_filter";
import {connect, useSelector} from "react-redux";
import {getContentCreatorNames} from "../../redux/actions";
import {useEffect} from "react";

const category = ["training plan", "nutrition plan", "coaching"];
const fitnessGoal = ["weight-loss", "weight-gain", "muscle-growth", "cardio"];
const fitnessLevel = ["beginner", "advanced", "professional"];
const lifestyle = ["vegan", "vegetarian", "pescatarian", "meat-based"];

/**
 * Filter bar that bundles all sub-filters into one component.
 *
 * @param props - To retrieve values from redux.
 * @param filter - Unified String[] of tags that the discovery view should be filtered for.
 * @param setFilter - Hook set function for the filter String[].
 * @param priceRange - Number[lower price limit, higher price limit] filter hook for the price filtering.
 * @param setPriceRange - Hook set function for the price.
 * @return {JSX.Element} - Returns filter component.
 */
function FilterBar(props) {

  // Hook that saves current state of content creators in db.
  const creatorsNames = useSelector((state) => {
    return state.creatorsNames.creatorsNames;
  });

  // On open load the creator names.
  useEffect(() => {
    if(!creatorsNames){
      props.dispatch(props.getContentCreatorNames());
    }
  }, [creatorsNames]);


  // Hook to track if the price was filtered.
  const [priceFiltered, setPriceFiltered] = useState(false);

  // Deletes a String[] tags from the current set of applied filter
  function deleteFilter(tags) {
    props.setFilter((filter) => filter.filter((tag) => !tags.includes(tag)));
  }

  // Adds a String[] tags from the current set of applied filter.
  function addFilter(tags) {
    props.setFilter((filter) => filter.concat(tags));
  }

  // Deletes all tags from current filter.
  function deleteAllFilter() {
    props.setFilter([]);
    resetPriceFilter();
  }

  // Resets the price filter and displayed chip.
  function resetPriceFilter() {
    setPriceFiltered(false);
    props.setPriceRange([0.0, 1000.0]);
  }

  return !creatorsNames ? (<div></div>) : (
    <Stack spacing={1.5} marginBottom={1.5}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography marginTop={0.75} variant="h3">
          Filters:
        </Typography>
        <Grid container>
          <Grid item>
            <SearchFilter
              title="Category"
              tags={category}
              addFilter={addFilter}
              deleteFilter={deleteFilter}
              globalFilter={props.filter}
            />
          </Grid>
          <Grid item>
            <SearchFilter
              title="Fitness Goal"
              tags={fitnessGoal}
              addFilter={addFilter}
              deleteFilter={deleteFilter}
              globalFilter={props.filter}
            />
          </Grid>
          <Grid item>
            <SearchFilter
              title="Fitness Level"
              tags={fitnessLevel}
              addFilter={addFilter}
              deleteFilter={deleteFilter}
              globalFilter={props.filter}
            />
          </Grid>
          <Grid item>
            <SearchFilter
              title={"Lifestyle"}
              tags={lifestyle}
              addFilter={addFilter}
              deleteFilter={deleteFilter}
              globalFilter={props.filter}
            />
          </Grid>
          <Grid item>
            <SlideFilter
              priceRange={props.priceRange}
              setPriceRange={props.setPriceRange}
              setPriceFiltered={setPriceFiltered}
            />
          </Grid>
          <Grid item>
            <SearchFilter
              title={"Creator"}
              tags={creatorsNames}
              addFilter={addFilter}
              deleteFilter={deleteFilter}
              globalFilter={props.filter}
            />
          </Grid>
        </Grid>
      </Stack>
      {(props.filter.length > 0 || priceFiltered) && (
        <Grid container alignItems="center">
          <Grid item>
            <Typography
              fontWeight={550}
              variant="h4"
              style={{ marginRight: "10px" }}
            >
              Selected Filters:
            </Typography>
          </Grid>
          {props.filter.map((tag, index) => (
            <Grid item key={index}>
              <Chip
                sx={{ ml: 1 }}
                label={tag}
                onDelete={() => deleteFilter([tag])}
              />
            </Grid>
          ))}
          {priceFiltered && (
            <Chip
              sx={{ ml: 1 }}
              label={`Price: ${props.priceRange[0]} - ${props.priceRange[1]}€`}
              onDelete={resetPriceFilter}
            />
          )}
          <Grid item>
            <Button sx={{ ml: 2 }} variant="text" onClick={deleteAllFilter}>
              delete all
            </Button>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getContentCreatorNames
});

export default connect(null, mapDispatchToProps)(FilterBar);