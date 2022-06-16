import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Divider, Rating, Stack, TextField } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { HighlightButton } from '../../buttons/highlight_button';
import { StandardButton } from '../../buttons/standard_button';
import {ReactComponent as LogoSmall} from "../../../resources/logo_small.svg";
import {ReactComponent as LogoText} from "../../../resources/logo_text.svg";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function RatingDialog(){

  const [value, setValue] = React.useState(2); // States for Rating

  const [open, setOpen] = React.useState(false);  // States for popup

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     <HighlightButton variant='contained' onClick={handleClickOpen}>write a review</HighlightButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Stack direction="row" >
            <Typography maxRows={1}>
            Create Review 
            </Typography>
            <LogoSmall width="80%"/> 
            <LogoText width="80%"/>
            </Stack>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Stack spacing={1}
        >
          <Typography> 
            Igor Something
          </Typography> 
          <Divider>

          </Divider>
          <Stack direction="row" spacing={40}>
            <Typography>
              Overall rating
            </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            defaultValue={3}
            icon={<StarIcon color='warning'></StarIcon>}
            onChange={(event, newValue) => {
            setValue(newValue);
              }}
          />
          </Stack>

          <TextField
          id='outlined-basic'
          label="Add a written review" 
          variant="outlined"
          multiline
          minRows={5}
          maxRows={5}
          
          >
          </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <StandardButton autoFocus onClick={handleClose} variant="contained">
            cancel
          </StandardButton>
          <HighlightButton autoFocus onClick={handleClose} variant="contained">
            submit 
          </HighlightButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}