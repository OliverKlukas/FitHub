import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";

export default function SearchFilter({title, tags, addFilter, deleteFilter, globalFilter}){
    const [lastFilter, setLastFilter] = useState([]);
    return(
        <Autocomplete
            sx={{ mx: 2, minWidth: 200}}
            multiple
            disableCloseOnSelect
            id={title}
            options={tags}
            value={lastFilter}
            onOpen={
                () => setLastFilter(lastFilter => lastFilter.filter(tag => globalFilter.includes(tag)))
            }
            onChange={(event, newFilter ) => {
                // Step 1: check if elements have been deleted and if so delete them in the common filter.
                let add = newFilter.filter(tag => !lastFilter.includes(tag));
                if(add.length > 0){
                    addFilter(add);
                }

                // Step 2: check if elements have been added and if so add them to the common filter.
                let del = lastFilter.filter(tag => !newFilter.includes(tag));
                if(del.length > 0){
                    deleteFilter(del);
                }

                // Step 3: update lastFilter with the updated one.
                setLastFilter(newFilter);
            }}
            renderTags={() => {
                return null;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{
                        '& label':{
                            color: 'secondary.main',
                            fontSize: 18,
                            fontWeight: 600,
                        },
                        '& label.Mui-focused': {
                            color: 'primary.main',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                        },
                    }}
                    variant="standard"
                    label={title}
                />
            )}
        />

    );
}