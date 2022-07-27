import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { HighlightButton } from "../buttons/highlight_button";
import { StandardButton } from "../buttons/standard_button";
import { useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  Link,
  Snackbar,
  Box,
  Alert,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import EuroSymbol from "@mui/icons-material/Euro";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import UploadButton from "../buttons/upload_button";
import Checkbox from "@mui/material/Checkbox";
import { red } from "@mui/material/colors";
import ContentService from "../../services/contentService";

const UpdateDial = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UpdateContentTitle = (props) => {
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

UpdateContentTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

/**
 *
 * @param {*} props for state management
 * @returns
 */
export default function UpdateContent(props) {
  const item = props.item;
  // for state Management
  const user = useSelector((state) => state.user);
  // State for Popup
  const [open, setOpen] = React.useState(false);

  // States for Success Snackbar
  const [snackopen, setsnackOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = () => {
    setsnackOpen(false);
  };

  // available tags per option
  const fitnessGoal = ["weight-loss", "weight-gain", "muscle-growth", "cardio"];
  const fitnessLevel = ["beginner", "advanced", "professional"];
  const lifestyle = ["vegan", "vegetarian", "pescatarian", "meat-based"];

  const currentGoals = [];
  const currentLevel = [];
  const currentLifestyle = [];

  // sort existing tags to tag category
  item.tags.forEach((tag) => {
    if (fitnessGoal.includes(tag)) currentGoals.push(tag);
    if (fitnessLevel.includes(tag)) currentLevel.push(tag);
    if (lifestyle.includes(tag)) currentLifestyle.push(tag);
  });

  const preInputValue = "Type here...";

  //#region hooks
  // Hooks to save filled upload form, all use current content values
  const [category, setCategory] = useState(item.category);
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);
  let priceModf = "";
  const [description, setDescription] = useState(item.description);
  const [duration, setDuration] = useState(parseInt(item.duration));
  const [intensity, setIntensity] = useState(parseInt(item.intensity));
  const [goalTags, setGoalTags] = useState(currentGoals);
  const [levelTags, setLevelTags] = useState(currentLevel);
  const [lifestyleTags, setLifestyleTags] = useState(currentLifestyle);
  const [support, setSupport] = useState(item.support);
  const [media, setMedia] = useState(item.media);
  const [plan, setPlan] = useState([item.plan]);
  const [sample, setSample] = useState([item.sample]);
  const [feature, setFeatured] = useState(item.featured);

  //error handling
  const [priceError, setPriceError] = React.useState(false);
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [durationError, setDurationError] = React.useState(false);
  const [intensityError, setIntensityError] = React.useState(false);
  const [tagsError, setTagsError] = React.useState(false);
  const [mediaError, setMediaError] = React.useState(false);
  const [planError, setPlanError] = React.useState(false);
  const [sampleError, setSampleError] = React.useState(false);

  //#endregion hooks

  //#region validation
  const validatePrice = () => {
    // [0-9]+ -> x times the numbers 0-9
    // ([.,][0-9]{1,2})? -> ? means optionl (inside bracket)
    // [.,] -> comma or point
    // [0-9]{1,2} -> 1 or 2 times a number
    if (price.match(/^([0-9]+([.,][0-9]{1,2})?)$/) === null) {
      setPriceError(true); //error input field
    } else {
      setPriceError(false);
    }
  };

  const validateTitle = () => {
    //[a-zA-Z\-0-9<>!?();:.,-~+*#"%ß\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc]+ -> x times all these chars (äöüÄÖÜ unicode)
    //(\s+)? -> optional space(s)
    //{3,10} -> min 3 chars, max 10 words
    if (
      title.match(
        /^((([a-zA-Z\-0-9<>!?();:.,-~+*#"%ß\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc]+)(\s+)?)){3,10}$/
      ) === null
    ) {
      setTitleError(true); //error input field
    } else {
      setTitleError(false);
    }
  };

  const validateDescription = () => {
    //[a-zA-Z\-0-9<>!?();:.,-~+*#"%ß\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc]+ -> x times all these chars (äöüÄÖÜ unicode)
    //(\s+)? -> optional space(s)
    //{5,30} -> min 5 chars, max 30 words
    if (
      description.match(
        /^((([a-zA-Z\-0-9<>!?();:.,-~+*#"%ß\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc]+)(\s+)?)){5,30}$/
      ) === null
    ) {
      setDescriptionError(true); //error input field
    } else {
      setDescriptionError(false);
    }
  };

  const validateDuration = () => {
    // numbers between 1-99
    if (duration > 0 && duration <= 99) {
      setDurationError(false);
    } else {
      setDurationError(true); //error input field
    }
  };

  const validateIntensity = () => {
    // numbers between 1-99
    if (intensity > 0 && intensity <= 99) {
      setIntensityError(false);
    } else {
      setIntensityError(true); //error input field
    }
  };

  const validateTags = () => {
    if (
      goalTags.length === 0 ||
      levelTags.length === 0 ||
      lifestyleTags.length === 0
    ) {
      setTagsError(true);
    } else {
      setTagsError(false);
    }
  };

  //#endregion

  //#region snackbars

  //snackbar to notify user that content is missing
  const [uploadSnack, setUploadSnack] = useState(false);
  // close the snackbar of missing content notification
  const handleUploadSnack = () => {
    setUploadSnack(false);
  };

  //#endregion snackbar

  // Merge all hooks together and publish it to mongodb.
  async function publishContent() {
    try {
      const temp = {
        ownerId: user.user._id,
        category: category,
        title: title,
        description: description,
        price: priceModf,
        duration: parseInt(duration),
        intensity: parseInt(intensity),
        support: category === "coaching" ? true : support,
        tags: goalTags.concat(
          levelTags,
          lifestyleTags,
          [category === "coaching" ? "coaching" : category + " plan"],
          [user.user.fname + " " + user.user.lname]
        ),
        featured: feature,
        media: media,
        plan: plan[0],
        sample: sample[0],
        deleteflag: false,
        _id: item._id,
      };
      await ContentService.updateContent(temp);
      setOpen(false);
      setsnackOpen(true);
      window.location.reload(false);
    } catch (error) {
      setUploadSnack(true);
    }
  }

  // User input verification and hand-off to backend database publication.
  function handlePublishContent() {
    if (price.length !== 0) {
      if (price.includes(".")) {
        priceModf = price.replace(".", ",");
      } else {
        priceModf = price;
      }

      if (!priceModf.includes(",")) {
        priceModf = priceModf + ",00";
      } else if (priceModf.substring(priceModf.indexOf(",")).length === 0) {
        priceModf = priceModf + "00";
      } else if (priceModf.substring(priceModf.indexOf(",")).length === 1) {
        priceModf = priceModf + "0";
      }
    }

    if (category === "coaching") setSupport(true);

    validatePrice();
    validateTitle();
    validateDescription();
    validateTags();
    validateDuration();
    validateIntensity();

    if (
      !titleError &&
      !priceError &&
      !descriptionError &&
      !durationError &&
      !intensityError &&
      !tagsError &&
      media.length !== 0 &&
      plan.length !== 0 &&
      sample.length !== 0
    ) {
      publishContent();
    } else {
      if (
        titleError ||
        priceError ||
        descriptionError ||
        durationError ||
        intensityError ||
        media.length === 0 ||
        plan.length === 0 ||
        sample.length === 0 ||
        tagsError
      ) {
        setUploadSnack(true);
        if (media.length === 0) {
          setMediaError(true);
        }
        if (plan.length === 0) {
          setPlanError(true);
        }
        if (sample.length === 0) {
          setSampleError(true);
        }
      }
    }
  }

  return (
    <div>
      <StandardButton
        variant="contained"
        onClick={handleClickOpen}
        sx={{ width: 300 }}
      >
        Update
      </StandardButton>
      <UpdateDial
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <UpdateContentTitle id="customized-dialog-title" onClose={handleClose}>
          Adjust your offering
        </UpdateContentTitle>
        <DialogContent dividers>
          <Stack padding={1} borderRadius="5px" spacing={2}>
            <Stack spacing={3} direction="row" alignItems="center">
              <Typography
                sx={{ minWidth: 100 }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Category:
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="category-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={item.category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <FormControlLabel
                    value="training"
                    control={<Radio />}
                    label="Training plan"
                  />
                  <FormControlLabel
                    value="nutrition"
                    control={<Radio />}
                    label="Nutrition plan"
                  />
                  <FormControlLabel
                    value="coaching"
                    control={<Radio />}
                    label="Coaching"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Stack spacing={2} direction="row" alignItems="baseline">
              <Typography
                sx={{ minWidth: 100 }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Title:
              </Typography>
              <TextField
                id="title-input"
                placeholder={preInputValue}
                value={title}
                onBlur={validateTitle}
                onChange={(event) => setTitle(event.target.value)}
                error={titleError}
                helperText={
                  titleError
                    ? 'Enter min 3 letters and maximum 10 words, allowed symbols: <>!?();:.,-~+*#"%'
                    : "Please enter a short and catchy title that best describes your fitness offering"
                }
                variant="filled"
                size="small"
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="baseline">
              <Typography
                sx={{ minWidth: 100 }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Price:
              </Typography>
              <TextField
                sx={{ maxWidth: 200 }}
                error={priceError}
                id="price-input"
                placeholder={preInputValue}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                onBlur={validatePrice}
                helperText={
                  priceError
                    ? "Unaccepted price format! Shape to format like 50,00 (example)"
                    : "Prices must include VAT and represent the total costs you expect buyers to pay"
                }
                variant="filled"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroSymbol />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="baseline">
              <Typography
                sx={{ minWidth: 100 }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Description:
              </Typography>
              <TextField
                id="description-input"
                multiline
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                onBlur={validateDescription}
                error={descriptionError}
                rows={4}
                variant="filled"
                placeholder={preInputValue}
                size="small"
                helperText={
                  descriptionError
                    ? 'Please enter min 5 letters, max 30 words, allowed symbols: <>!?();:.,-~+*#"%'
                    : "Please enter a description that conveys what buyers can expect from this offering"
                }
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography
                sx={{ minWidth: 100 }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Scope:
              </Typography>
              <Stack spacing={2} direction="row">
                <TextField
                  sx={{ maxWidth: 200 }}
                  id="duration-input"
                  label="Duration"
                  onBlur={validateDuration}
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  type="number"
                  variant="filled"
                  placeholder={preInputValue}
                  helperText={
                    durationError
                      ? "display the amount of weeks by entering a number between 1-99"
                      : "Amount of weeks"
                  }
                  size="small"
                  error={durationError}
                />
                <TextField
                  sx={{ maxWidth: 200 }}
                  id="intensity-input"
                  label="Intensity"
                  type="number"
                  onBlur={validateIntensity}
                  error={intensityError}
                  value={intensity}
                  onChange={(event) => setIntensity(event.target.value)}
                  variant="filled"
                  placeholder={preInputValue}
                  helperText={
                    intensityError
                      ? category === "nutrition"
                        ? "enter a number between 1-99 meals per day"
                        : "enter a number between 1-99 trainings per week"
                      : category === "nutrition"
                      ? "Meals per day"
                      : "Trainings per week"
                  }
                  size="small"
                />
              </Stack>
            </Stack>
            <Stack spacing={2} direction="row">
              <Typography
                sx={{ minWidth: 100 }}
                variant="subtitle1"
                fontWeight="bold"
              >
                Tags:
              </Typography>
              <Box>
                <Grid
                  container
                  justifyContent="flex-start"
                  maxWidth={600}
                  spacing={3}
                  columns={{ xs: 1, sm: 2 }}
                >
                  <Grid item xs={1} sm={1}>
                    <Autocomplete
                      multiple
                      id="goal-tags"
                      onBlur={validateTags}
                      options={fitnessGoal}
                      value={goalTags}
                      onChange={(event, value) => setGoalTags(value)}
                      renderInput={(params) => (
                        <TextField {...params} label="Fitness goal" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1} sm={1}>
                    <Autocomplete
                      multiple
                      id="goal-tags"
                      options={lifestyle}
                      onBlur={validateTags}
                      value={lifestyleTags}
                      onChange={(event, value) => setLifestyleTags(value)}
                      renderInput={(params) => (
                        <TextField {...params} label="Lifestyle" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1} sm={1}>
                    <Autocomplete
                      multiple
                      id="level-tags"
                      options={fitnessLevel}
                      onBlur={validateTags}
                      value={levelTags}
                      onChange={(event, value) => setLevelTags(value)}
                      renderInput={(params) => (
                        <TextField {...params} label="Fitness level" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1} sm={1}>
                    <Typography
                      variant="body2"
                      fontSize="small"
                      sx={
                        tagsError
                          ? {
                              color: red["A700"],
                            }
                          : { color: "default" }
                      }
                    >
                      Please type and select fitting tags (at least one) for
                      your content offering. These will be used to better reach
                      your target user group on FitHub.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h3">Uploads</Typography>
              <Stack spacing={2} direction="row">
                <Typography sx={{ minWidth: 200 }} variant="subtitle1">
                  Marketing material:
                </Typography>
                <Stack spacing={1}>
                  <UploadButton
                    uploadFormat="image/*"
                    givenId="marketing-upload"
                    multiUpload={true}
                    setUpload={setMedia}
                    setSuccess={setMediaError}
                  />
                  <Typography
                    variant="body2"
                    fontSize="small"
                    maxWidth={300}
                    sx={
                      mediaError
                        ? {
                            color: red["A700"],
                          }
                        : { color: "default" }
                    }
                  >
                    Please upload pictures that represents your offer (example
                    dishes, workouts etc). Be aware of the max size for all upload content of 16MB and
                    respect our{" "}
                    <Link
                      color="#393E46"
                      fontSize={14}
                      fontWeight={300}
                      underline="always"
                      target="_blank"
                      href="/terms-and-conditions"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    including image rights.
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={2} direction="row">
                <Typography sx={{ minWidth: 200 }} variant="subtitle1">
                  Full plan:
                </Typography>
                <Stack spacing={1}>
                  <UploadButton
                    uploadFormat=".pdf"
                    givenId="plan-upload"
                    multiUpload={false}
                    setUpload={setPlan}
                    setSuccess={setPlanError}
                  />
                  <Typography
                    variant="body2"
                    fontSize="small"
                    maxWidth={300}
                    sx={
                      planError
                        ? {
                            color: red["A700"],
                          }
                        : { color: "default" }
                    }
                  >
                    Please upload the pdf file that contains the
                    complete training plan that buyers are going to receive. Be aware of the max size for all upload content of 16MB.
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={2} direction="row">
                <Typography sx={{ minWidth: 200 }} variant="subtitle1">
                  Sample:
                </Typography>
                <Stack spacing={1}>
                  <UploadButton
                    uploadFormat=".pdf"
                    givenId="sample-upload"
                    multiUpload={false}
                    setUpload={setSample}
                    setSuccess={setSampleError}
                    existingValue={sample}
                  />
                  <Typography
                    variant="body2"
                    fontSize="small"
                    maxWidth={300}
                    sx={
                      sampleError
                        ? {
                            color: red["A700"],
                          }
                        : { color: "default" }
                    }
                  >
                    Please upload a sample pdf file which gives
                    buyers an impression of the full plan. Be aware of the max size for all upload content of 16MB.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Typography variant="h3">Additional options</Typography>
            <Stack spacing={0.5}>
              <Stack direction="row" alignItems="center">
                <Checkbox
                  value={support}
                  checked={category === "coaching" ? true : support}
                  onChange={(event) => setSupport(event.target.checked)}
                />
                {category === "coaching" ? (
                  <Typography variant="body1" fontWeight="bold">
                    Coachings automatically offer support via the chat function
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    Yes, I am offering support via chat for the buyers
                  </Typography>
                )}
              </Stack>
              <Stack direction="row" alignItems="center">
                <Checkbox
                  value={feature}
                  defaultChecked={item.featured}
                  onChange={(event) => setFeatured(event.target.checked)}
                />
                <Typography variant="body1">
                  Feature me in discovery for a increasing fee of 15% instead of
                  10% per transaction
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <StandardButton autoFocus onClick={handleClose} variant="contained">
            cancel
          </StandardButton>
          <HighlightButton
            autoFocus
            onClick={handlePublishContent}
            variant="contained"
          >
            submit
          </HighlightButton>
        </DialogActions>
      </UpdateDial>
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
          Successfully updated your content!
        </Alert>
      </Snackbar>
      <Snackbar
        open={uploadSnack}
        autoHideDuration={3600}
        onClose={handleUploadSnack}
      >
        <Alert
          onClose={handleUploadSnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          Fields are missing!
        </Alert>
      </Snackbar>
    </div>
  );
}
