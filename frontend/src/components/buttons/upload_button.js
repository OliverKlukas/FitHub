import {StandardButton} from "../buttons/standard_button";
import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export default function UploadButton({uploadFormat,givenId,multiUpload}) {
    const Input = styled('input')({
        display: 'none',
      });

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
      };

  return (
    <Grid item xs={2}>
      <Stack direction ="row" spacing={2} alignItems="center">
      <label htmlFor={givenId}>
          <Input accept={uploadFormat} id={givenId} multiple={multiUpload} type="file" onChange={changeHandler}/>
          <StandardButton variant="contained" component="span" upload>
              Upload
          </StandardButton>
      </label>
      <Grid item minWidth={100}>
      {isFilePicked ? (
        <div>
        <Typography variant="body2" fontSize="small">Filename: {selectedFile.name}</Typography>
      </div>
     ) : (
      <Typography variant="body2" fontSize="small">Select a file</Typography>
      )}
      </Grid>
      </Stack>
    </Grid>
  );
};
