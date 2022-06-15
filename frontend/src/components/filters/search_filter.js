import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";

/**
 * Single search filter component based on a customized MUI Autocomplete.
 *
 * @param title - String label of search filter.
 * @param tags - String[] of option tags to be selected from the filter.
 * @param addFilter - Reference to FilterBars hook functions.
 * @param deleteFilter - Reference to FilterBars hook functions.
 * @param globalFilter - Reference to FilterBars hook functions.
 * @returns {JSX.Element}
 */
export default function SearchFilter({title, tags, addFilter, deleteFilter, globalFilter}) {
    const [lastFilter, setLastFilter] = useState([]);

    return (<Autocomplete
            sx={{mx: 2, minWidth: 200}}
            multiple
            disableCloseOnSelect
            id={title}
            options={tags}
            value={lastFilter}
            onOpen={() => setLastFilter(lastFilter => lastFilter.filter(tag => globalFilter.includes(tag)))}
            onChange={(event, newFilter) => {
                // Check if elements have been deleted and if so delete them in the common filter.
                let add = newFilter.filter(tag => !lastFilter.includes(tag));
                if (add.length > 0) {
                    addFilter(add);
                }

                // Check if elements have been added and if so add them to the common filter.
                let del = lastFilter.filter(tag => !newFilter.includes(tag));
                if (del.length > 0) {
                    deleteFilter(del);
                }

                // Update lastFilter with the updated one.
                setLastFilter(newFilter);
            }}
            renderTags={() => {
                return null;
            }}
            renderInput={(params) => (<TextField
                {...params}
                sx={{
                    '& label': {
                        color: 'secondary.main', fontSize: 18, fontWeight: 600,
                    }, '& label.Mui-focused': {
                        color: 'primary.main',
                    }, '& .MuiInput-underline:after': {
                        borderBottomColor: 'white',
                    }, '& .MuiInput-underline:before': {
                        borderBottomColor: 'white',
                    },
                }}
                variant="standard"
                label={title}
            />)}
        />

    );
}