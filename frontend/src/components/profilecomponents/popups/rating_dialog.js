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
import UserService from "../../../services/userService";
import { useEffect, useState } from "react";

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
export default function RatingDialog(props) {
  const { width, id } = props;
  // State for user management
  // States for Review
  const [value, setValue] = React.useState(3);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");

  // Retrieve author.
  const [author, setAuthor] = useState(null);

  // Function to fetch username from service.
  async function fetchUser() {
    return await UserService.userdata(id);
  }
  // Trigger retrieval of states and backend data.
  useEffect(() => {
    if (!author) {
      fetchUser().then((res) => {
        setAuthor(res);
      });
    }
  }, [id]);

  // State for text error
  const [texterror, setTextError] = React.useState(true);

  // State for text error
  const [titleerror, setTitleError] = React.useState(true);

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

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setTitleError(false);
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
    await UserService.addreview(value, text, id, title);
    window.location.reload();
  };

  return (
    <div>
      <HighlightButton
        variant="contained"
        onClick={handleClickOpen}
        sx={{ width: width }}
      >
        Write a review
      </HighlightButton>
      <RatingDial
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <RatingDialTitle id="customized-dialog-title" onClose={handleClose}>
          <Stack direction="row">
            <Typography variant="h3">Create Review</Typography>
          </Stack>
        </RatingDialTitle>
        <DialogContent dividers>
          <Stack spacing={1}>
            <Typography>Igor</Typography>
            <Divider />
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
            <Divider />
            <TextField
              id="outlined-basic"
              label="Title of your review"
              variant="outlined"
              onChange={onChangeTitle}
            />

            <TextField
              id="outlined-basic"
              label="Add a written review"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={5}
              onChange={onChangeText}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <StandardButton autoFocus onClick={handleClose} variant="contained">
            cancel
          </StandardButton>
          <HighlightButton
            autoFocus
            onClick={handleSubmit}
            variant="contained"
            disabled={texterror || titleerror}
          >
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
