import {StandardButton} from "../buttons/standard_button";
import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Grid, Input, Snackbar} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiAlert from '@mui/material/Alert';


export default function UploadButton({uploadFormat, givenId, multiUpload}) {
    //necessary for alert function, copied from https://mui.com/material-ui/react-snackbar/
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [snackbar, setSnackbar] = React.useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        setSnackbar(true);
    };

    //deactivates snack bar again
    const handleSnackClose = () => {
        setSnackbar(false)
    }

    return (<Stack direction="row" spacing={2} alignItems="center">
            <label htmlFor={givenId}>
                <Input sx={{display: "none"}} accept={uploadFormat} id={givenId} multiple={multiUpload} type="file"
                       onChange={changeHandler}/>
                <StandardButton variant="contained" component="span" upload="true">
                    Upload
                </StandardButton>
            </label>
            {isFilePicked ? (<Typography minWidth={100} variant="body2"
                                         fontSize="small">Filename: {selectedFile.name}</Typography>) : (
                <Typography minWidth={100} variant="body2" fontSize="small">Select a file</Typography>)}
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx={{width: '100%'}}>
                    Successful upload
                </Alert>
            </Snackbar>
        </Stack>
    );
};
