/* eslint-disable prettier/prettier */
/* eslint-disable valid-jsdoc */
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
import loremIpsum from "react-lorem-ipsum";

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
 * popup to submit a review, includes TODO backend logic
 * @returns 
 */
export default function RatingDialog() {
  const [value, setValue] = React.useState(2); // States for Rating

  const [open, setOpen] = React.useState(false); // States for popup

  const [snackopen, setsnackOpen] = React.useState(false); // States for Snackbar

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  const review = {
    author: "Another User",
    text: loremIpsum(),
    title: "I like it",
    date: dd + mm + yyyy,
    star: 1,
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
    setOpen(false);
    setsnackOpen(true);
    submitReview(review);
  };

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
            <Typography maxRows={1} variant="h3">
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
