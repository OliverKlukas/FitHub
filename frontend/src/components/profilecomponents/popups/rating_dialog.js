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
import { Divider, Rating, Snackbar, Stack, TextField } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { HighlightButton } from "../../buttons/highlight_button";
import { StandardButton } from "../../buttons/standard_button";
import ReviewService from "../../../services/reviewService";

const RatingDial = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const RatingDialTitle = (props) => {
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

RatingDialTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

/**
 * Dialog for Submitting a Review
 * @returns 
 */
export default function RatingDialog({id}) {
  // State for user management
  // States for Review
  const [value, setValue] = React.useState(3);
  const [text, setText] = React.useState("");
  
  // State for text error
  const [texterror, setTextError] = React.useState(true)

  // State for popup
  const [open, setOpen] = React.useState(false); 

  // State for Snackbar
  const [snackopen, setsnackOpen] = React.useState(false); 

  // const today = new Date();
  // const dd = String(today.getDate()).padStart(2, "0");
  // const mm = String(today.getMonth() + 1).padStart(2, "0");
  // const yyyy = today.getFullYear();
  const onChangeText = (e) => {
    setText(e.target.value);
    setTextError(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = () => {
    setsnackOpen(false);
  };

  const handleSubmit = () => {
    putReview();
    setOpen(false);
    setsnackOpen(true);
  };

  const putReview = async () => {
    await ReviewService.addreview(value,text,id);
    window.location.reload();
  }
  
  return (
    <div>
      <HighlightButton variant="contained" onClick={handleClickOpen}>
        write a review
      </HighlightButton>
      <RatingDial
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <RatingDialTitle id="customized-dialog-title" onClose={handleClose}>
          <Stack direction="row">
            <Typography variant="h3">
              Create Review
            </Typography>
          </Stack>
        </RatingDialTitle>
        <DialogContent dividers>
          <Stack spacing={1}>
            <Typography>Igor Something</Typography>
            <Divider></Divider>
            <Stack direction="row" spacing={40}>
              <Typography>Overall rating</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                defaultValue={3}
                icon={<StarIcon color="warning"></StarIcon>}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Stack>

            <TextField
              id="outlined-basic"
              label="Add a written review"
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
          <HighlightButton autoFocus onClick={handleSubmit} variant="contained" disabled={texterror}>
            submit
          </HighlightButton>
        </DialogActions>
      </RatingDial>
      <Snackbar
        open={snackopen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message="Review Submitted"
      />
    </div>
  );
}
