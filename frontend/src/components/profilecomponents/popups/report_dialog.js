import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { HighlightButton } from "../../buttons/highlight_button";
import { StandardButton } from "../../buttons/standard_button";
import { Stack, Snackbar, TextField } from "@mui/material";
import emailjs from 'emailjs-com';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ReportDial = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));


const ReportDialTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
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

ReportDialTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

/**
 * 
 * @param {*} props for state management
 * @returns 
 */
export default function ReportDialog(props) {
  const { width, content_creator_id } = props
  const params = useParams()
  // for state Management
  const user = useSelector((state) => state.user);
  // State for Popup
  const [open, setOpen] = React.useState(false); 
  // for sending email
  const [form, setForm] = React.useState({
    from_name : "",
    message : "",
    content_creator: "",
  })
  // States for Snackbar
  const [snackopen, setsnackOpen] = React.useState(false); 

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // This should be executed in the Backend after a authorized API call, but for a mvp this is sufficient
  const handleSubmit = () => {
    emailjs.send('service_dxcny4u', 'template_6ql26rb',{
      from_name : form.from_name,
      message : form.message,
      content_creator: form.content_creator,
    }, 'gTSwj-_BxWpg0P2Ff')
    .then((result) => {
        console.log(result);   
    }, (error) => {
        console.log(error.text);
    });
    setOpen(false);
    setsnackOpen(true);
  };
  const handleSnackClose = () => {
    setsnackOpen(false);
  };
  const onChangeText = (e) => {
      e.preventDefault();
      setForm({
        from_name: user.user.email,
        message: e.target.value,
        content_creator: params.id ? params.id : content_creator_id,
      }
        );
        console.log(form);
  };

  return (
    <div>
      <StandardButton variant="contained" onClick={handleClickOpen} sx = {{width: width}}>
        report this content creator
      </StandardButton>
      <ReportDial
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <ReportDialTitle id="customized-dialog-title" onClose={handleClose}>
          Write a short report
        </ReportDialTitle>
        <DialogContent dividers>
          <Stack>
            <Typography gutterBottom>
              This report will be sent to FitHub and will not be published.
            </Typography>
            <TextField
              id="outlined-basic"
              label="Please state the reason for your report here"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={5}
              onChange={onChangeText}
            ></TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <StandardButton autoFocus onClick={handleClose} variant="contained">
            cancel
          </StandardButton>
          <HighlightButton autoFocus onClick={handleSubmit} variant="contained">
            submit
          </HighlightButton>
        </DialogActions>
      </ReportDial>
      <Snackbar
        open={snackopen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message="Report Submitted"
      />
    </div>
  );
}
