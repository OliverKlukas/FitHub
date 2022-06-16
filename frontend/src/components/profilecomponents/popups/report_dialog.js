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
import { HighlightButton } from '../../buttons/highlight_button';
import { StandardButton } from '../../buttons/standard_button';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';

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

export default function ReportDialog(){
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     <StandardButton variant='contained' onClick={handleClickOpen}>report this content creator</StandardButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Write a short report
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack>
          <Typography gutterBottom>
            This report will be sent to FitHub and will not be published.
          </Typography>
          <TextField
          id='outlined-basic'
          label="Please state the reason for your report here" 
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