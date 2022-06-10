import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {Autocomplete, Grid, Input, Slider, Stack, TextField, Typography} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
]

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function MultipleSelectChip({title}) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" label={title} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {content_creator.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 10;

export default function FilterBar(){

    const [value2, setValue2] = React.useState([20, 37]);

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
            setValue2(newValue);
        }
    };


    return(
        <Stack>
            <Stack direction="row">
                <h4>Filters:</h4>
                <Grid container>
                    <Grid item>
                        <MultipleSelectChip title="Category"/>
                    </Grid>
                    <Grid item>
                        <MultipleSelectChip title="Fitness Goal"/>
                    </Grid>
                    <Grid item>
                        <MultipleSelectChip title="Fitness Level"/>
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            sx={{ m: 1, width: 200 }}
                            multiple
                            id="tags-standard"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Lifestyle"
                                    placeholder="Favorites"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <Stack>
                            <Typography>Price</Typography>
                            <Slider
                                sx={{width: 200}}
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={value2}
                                onChange={handleChange2}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                            />
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            sx={{ m: 1, width: 200 }}
                            multiple
                            id="tags-standard"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Creator"
                                    placeholder="Favorites"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </Stack>
            <Stack direction="row">
                <h4>Selected Filters:</h4>
                <Typography>
                    X Delete All
                </Typography>
            </Stack>
        </Stack>
    );
}
