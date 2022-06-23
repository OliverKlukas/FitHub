import {StandardButton} from "../buttons/standard_button";
import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";


export default function UploadButton({uploadFormat,givenId,multiUpload}) {
    const Input = styled('input')({
        display: 'none',
      });
  return (
    <Grid item xs={2}>
          <label htmlFor={givenId}>
              <Input accept={uploadFormat} id={givenId} multiple={multiUpload} type="file" />
              <StandardButton variant="contained" component="span">
                    Upload
              </StandardButton>
           </label>
           </Grid>
  );
};
