import {StandardButton} from "../buttons/standard_button";
import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import { Grid , Snackbar} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiAlert from '@mui/material/Alert';


/**
 * 
 * @param {*} uploadFormat allowed format for upload (e.g. here pdf or images)
 * @param {*} givenId  html id for the input
 * @param {*} multiUpload boolean if input allows multiple files 
 * @returns 
 */
export default function UploadButton({uploadFormat,givenId,multiUpload}) {
    const Input = styled('input')({
        display: 'none',
      });

    //necessary for alert function, copied from https://mui.com/material-ui/react-snackbar/
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });  

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [snackopen, setsnackOpen] = React.useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
        setIsFilePicked(true);
        setsnackOpen(true);
      };

    //deactivates snack bar again
    const handleSnackClose= () => {
        setsnackOpen(false);
      }


  return (
    <Grid item xs={2}>
      <Stack direction ="row" spacing={2} alignItems="center">
      <label htmlFor={givenId}>
          <Input accept={uploadFormat} id={givenId} multiple={multiUpload} type="file" onChange={changeHandler}/>
          <StandardButton variant="contained" component="span" upload>
              Upload
          </StandardButton>
      </label>
      <Grid item minWidth={300}>
      {isFilePicked ? (
        <div>
        <Typography variant="body2" fontSize="small">Filename: </Typography>
        {Array.from(selectedFile).map((item) => (
            <Typography variant="body2" fontSize="small">{item.name} </Typography>
          ))}
        </div>
     ) : (
      <Typography variant="body2" fontSize="small">Select a file</Typography>
      )}
      </Grid>
      </Stack>
    <Snackbar open={snackopen} autoHideDuration={6000} onClose={handleSnackClose}>
      <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
        Successful upload 
      </Alert>
    </Snackbar>
    </Grid>

  );
};
