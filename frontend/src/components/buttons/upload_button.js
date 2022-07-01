import { StandardButton } from "../buttons/standard_button";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {Box, Grid, Snackbar} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";

export default function UploadButton(uploadFormat, givenId, multiUpload) {
    const Input = styled("input")({
        display: "none",
    });

    // necessary for alert function, copied from https://mui.com/material-ui/react-snackbar/
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [snackopen, setsnackOpen] = React.useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        setsnackOpen(true);
    };

    // deactivates snack bar again
    const handleSnackClose = () => {
        setsnackOpen(false);
    };

    return (
            <Stack direction="row" alignItems="center">
                <Input
                    style={{display: "none"}}
                    accept={uploadFormat}
                    id={givenId}
                    multiple={multiUpload}
                    type="file"
                    onChange={changeHandler}
                />
                <label htmlFor={givenId}>
                    <StandardButton variant="contained" upload="true">
                        Upload
                    </StandardButton>
                </label>
                {isFilePicked ? (
                    <Typography variant="body2" fontSize="small">
                        Filename: {selectedFile.name}
                    </Typography>
                ) : (
                    <Typography variant="body2" fontSize="small">
                        Select a file
                    </Typography>
                )}
                <Snackbar
                    open={snackopen}
                    autoHideDuration={6000}
                    onClose={handleSnackClose}
                >
                    <Alert
                        onClose={handleSnackClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Successful upload
                    </Alert>
                </Snackbar>
            </Stack>
    );
}
