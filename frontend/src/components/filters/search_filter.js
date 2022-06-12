import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";
import {blue, grey} from "@mui/material/colors";

export default function SearchFilter({title, tags, addFilter}){
    return(
        <Autocomplete
            sx={{ mx: 2, minWidth: 200}}
            multiple
            disableCloseOnSelect
            id={title}
            options={tags}
            onChange={(event, value) => {
                console.log(value);
                addFilter(value);
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