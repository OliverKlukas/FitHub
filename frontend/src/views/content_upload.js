import * as React from "react";
import {
  Grid,
  Stack,
  Typography,
  Link,
  Snackbar,
  Box,
  Alert,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import EuroSymbol from "@mui/icons-material/Euro";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import UploadButton from "../components/buttons/upload_button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { addContent } from "../redux/actions";
import Checkbox from "@mui/material/Checkbox";
import { CancelButton } from "../components/buttons/cancel_button";
import { StandardButton } from "../components/buttons/standard_button";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import InsightsDrawer from "../components/drawer/insights_drawer";
import Divider from "@mui/material/Divider";

const preInputValue = "Type here...";
const fitnessGoal = ["weight-loss", "weight-gain", "muscle-growth", "cardio"];
const fitnessLevel = ["beginner", "advanced", "professional"];
const lifestyle = ["vegan", "vegetarian", "pescatarian", "meat-based"];

/**
 * Handles the upload of new content to database.
 *
 * @param props - receives database function addContent via props.
 *
 */
function ContentUpload(props) {
  // Handle navigation with react router.
  const navigate = useNavigate();

  //get the logged in user
  const user = useSelector((state) => state.user);

  let defaultCategory = "training";

  if (
    props.data.choice === "training" ||
    props.data.choice === "nutrition" ||
    props.data.choice === "coaching"
  ) {
    defaultCategory = props.data.choice;
  }

  // Hooks to save filled out upload form, all need pre-defined value.
  const [category, setCategory] = useState(defaultCategory);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [goalTags, setGoalTags] = useState([]);
  const [levelTags, setLevelTags] = useState([]);
  const [lifestyleTags, setLifestyleTags] = useState([]);
  const [support, setSupport] = useState(false);
  const [media, setMedia] = useState([]);
  const [plan, setPlan] = useState([]);
  const [sample, setSample] = useState([]);
  const [feature, setFeatured] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Handle publishing failure and success.
  const [pubFailure, setPubFailure] = useState(false);
  const [pubSuccess, setPubSuccess] = useState(false);

  //snackbar missing mandatory checkboxes
  const [checkFailure, setCheckFailure] = useState(false);
  // close the snackbar of mandatory checkboxes
  const handleCheckFailure = () => {
    setCheckFailure(false);
  };

  //snackbar missing tags
  const [tagsSnack, setTagsSnack] = useState(false);
  // close the snackbar of tags
  const handleTagsSnack = () => {
    setTagsSnack(false);
  };

  //snackbar for 16MB upload boundry
  const [uploadSnack, setUploadSnack] = useState(false);
  // close the snackbar of upload boundry
  const handleUploadSnack = () => {
    setUploadSnack(false);
  };

  // Switch to discovery view after successful publication and reload in order to show item.
  function handlePublicationSuccess() {
    navigate("/discovery");
    window.location.reload();
  }

  // Cancel the upload of content.
  function handleCancelSubmit() {
    navigate("/landing");
  }

  // User input verification and hand-off to backend database publication.
  function handlePublishContent() {
    // TODO: verify that the above defined hooks match our criteria, i.e. with regex that we could put i.e. into utils folder and use project wide
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
      sample.length !== 0 &&
      termsChecked &&
      qualityChecked
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
        sample.length === 0
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
      } else if (!termsChecked || !qualityChecked) {
        setCheckFailure(true);
      } else if (tagsError) {
        setTagsSnack(true);
      }

      //feedback mandatory checkboxes
      if (!termsChecked) {
        setMissedTermsCheck(true);
      } else {
        setMissedTermsCheck(false);
      }

      if (!qualityChecked) {
        setMissedQualityCheck(true);
      } else {
        setMissedQualityCheck(false);
      }
    }
  }

  // Merge all hooks together and publish it to mongodb.
  async function publishContent() {
    try {
      await props.addContent({
        ownerId: user.user._id,
        category: category,
        title: title,
        description: description,
        price: price,
        duration: parseInt(duration),
        intensity: parseInt(intensity),
        support: support,
        tags: goalTags.concat(levelTags, lifestyleTags, [
          user.user.fname + " " + user.user.lname,
        ]),
        featured: feature,
        media: media,
        plan: plan[0],
        sample: sample[0],
      });
      setPubSuccess(true);
    } catch (error) {
      setPubFailure(true);
      console.log("Publishing content failed!");
    }
  }

  const validatePrice = () => {
    // [0-9]+ -> x times the numbers 0-9
    // ([.,][0-9]{1,2})? -> ? means optionl (inside bracket)
    // [.,] -> comma or point
    // [0-9]{1,2} -> 1 or 2 times a number
    // \s? -> optional space
    // (€)? -> optional euro sign
    if (price.match(/^([0-9]+([.,][0-9]{1,2})?\s?(€)?)$/) === null) {
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
    //([0-9]){1,3} -> numbers with length min 1, max 3
    if (duration.match(/^([1-9][0-9]?){1,1}$/) === null) {
      setDurationError(true); //error input field
    } else {
      setDurationError(false);
    }
  };

  const validateIntensity = () => {
    //([0-9]){1,3} -> numbers with length min 1, max 3
    if (intensity.match(/^([1-9][0-9]?){1,1}$/) === null) {
      setIntensityError(true); //error input field
    } else {
      setIntensityError(false);
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

  // state for Terms and Conditions Checkbox
  const [termsChecked, setTermsChecked] = React.useState(false);
  // state for Terms and Conditions Checkbox
  const [qualityChecked, setQualityChecked] = React.useState(false);

  // will be true as mandatory checks arent fullfilled
  const [missedTermsCheck, setMissedTermsCheck] = React.useState(false);
  const [missedQualityCheck, setMissedQualityCheck] = React.useState(false);

  // change acceptance state of the terms and conditions if the checkbox is clicked
  const handleTermsChange = (event) => {
    setTermsChecked(event.target.checked);
  };
  // change acceptance state of the terms and conditions if the checkbox is clicked
  const handleQualityChange = (event) => {
    setQualityChecked(event.target.checked);
  };

  return (
    <Stack direction="row" marginTop={5} spacing={5}>
      <InsightsDrawer currTab="Upload" />
      <Divider orientation="vertical" flexItem />
      <Stack
        padding={3}
        backgroundColor="#EEEEEE"
        borderRadius="8px"
        spacing={2}
        width="90%"
      >
        <Typography variant="h1" fontWeight="bold">
          Offer your content
        </Typography>
        <Typography variant="h3">General information</Typography>
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
            defaultValue={defaultCategory}
            onChange={(event) => setCategory(event.target.value)}
          >
            Category:
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="category-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={defaultCategory}
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
            onChange={(event) => setTitle(event.target.value)}
            helperText="Please enter a short and catchy title that best describes your fitness offering"
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
            id="price-input"
            placeholder={preInputValue}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            helperText="Prices must include VAT and represent the total costs you expect buyers to pay"
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
            rows={4}
            variant="filled"
            placeholder={preInputValue}
            size="small"
            helperText="Please enter a description that conveys what buyers can expect from this offering"
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
              id="duration-input"
              label="Duration"
              multiline
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              type="number"
              variant="filled"
              placeholder={preInputValue}
              helperText="Amount of weeks"
              size="small"
            />
            <TextField
              id="intensity-input"
              label="Intensity"
              multiline
              value={intensity}
              onChange={(event) => setIntensity(event.target.value)}
              variant="filled"
              placeholder={preInputValue}
              helperText={
                category === "nutrition"
                  ? "Meals per week"
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
                Please type and select fitting tags (at least one) for your
                content offering. These will be used to better reach your target
                user group on FitHub.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Stack>
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
            Please upload pictures that represents your offer (example dishes,
            workouts etc). Be aware of the max size of 16MB and respect our{" "}
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
            including image rights
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
            Please upload the pdf file of max 16MB that contains the complete
            training plan that buyers are going to receive
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
            Please upload a sample pdf file of max 16MB which gives buyers an
            impression of the full plan
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="h3">Additional options</Typography>
      <Stack spacing={0.5}>
        <Stack direction="row" alignItems="center">
          <Checkbox
            value={marketing}
            onChange={(event) => setMarketing(event.target.checked)}
          />
          <Typography variant="body1">
            Yes, email me for marketing events like vouchers & sales weekends
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Checkbox
            value={support}
            onChange={(event) => setSupport(event.target.checked)}
          />
          <Typography variant="body1">
            Yes, I am offering full-time support for the buyers
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Checkbox
            value={feature}
            onChange={(event) => setFeatured(event.target.checked)}
          />
          <Typography variant="body1">
            Feature me in discovery for a increasing fee of 15% instead of 10%
            per transaction
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="h3">Legal notices</Typography>
      <Stack spacing={0.5}>
        <Stack direction="row" alignItems="center">
          <Checkbox
            checked={qualityChecked}
            onChange={handleQualityChange}
            sx={
              missedQualityCheck
                ? {
                    color: red["A700"],
                  }
                : { color: "default" }
            }
          />
          <Typography
            variant="body1"
            sx={
              missedQualityCheck
                ? {
                    color: red["A700"],
                  }
                : { color: "default" }
            }
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
                  value={levelTags}
                  onChange={(event, value) => setLevelTags(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Fitness level" />
                  )}
                />
              </Grid>
              <Grid item xs={1} sm={1}>
                <Typography variant="body2" fontSize="small">
                  Please type and select fitting tags for your content offering.
                  These will be used to better reach your target user group on
                  FitHub.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
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
            />
            <Typography variant="body2" fontSize="small" maxWidth={300}>
              Please upload pictures that represents your offer (example dishes,
              workouts etc). Be aware and respect our{" "}
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
              including image rights
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
            />
            <Typography variant="body2" fontSize="small" maxWidth={300}>
              Please upload the pdf file that contains the complete training
              plan that buyers are going to receive
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
            />
            <Typography variant="body2" fontSize="small" maxWidth={300}>
              Please upload a sample pdf file which gives buyers an impression
              of the full plan
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="h3">Additional options</Typography>
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center">
            <Checkbox
              value={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
            />
            <Typography variant="body1">
              Yes, email me for marketing events like vouchers & sales weekends
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Checkbox
              value={support}
              onChange={(event) => setSupport(event.target.checked)}
            />
            <Typography variant="body1">
              Yes, I am offering full-time support for the buyers
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Checkbox
              value={feature}
              onChange={(event) => setFeatured(event.target.checked)}
            />
            <Typography variant="body1">
              Feature me in discovery for a increasing fee of 15% instead of 10%
              per transaction
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="h3">Legal notices</Typography>
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={qualityChecked}
              onChange={handleQualityChange}
              sx={
                missedQualityCheck
                  ? {
                      color: pink[800],
                    }
                  : { color: "default" }
              }
            />
            <Typography
              variant="body1"
              sx={
                missedQualityCheck
                  ? {
                      color: pink[800],
                    }
                  : { color: "default" }
              }
            >
              Yes, I ensure delivery of the expected quality and know
              intentional fooling attempts will result in penalties like an
              account ban
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={termsChecked}
              onChange={handleTermsChange}
              sx={
                missedTermsCheck
                  ? {
                      color: pink[800],
                    }
                  : { color: "default" }
              }
            />
            <Typography
              variant="body1"
              sx={
                missedTermsCheck
                  ? {
                      color: pink[800],
                    }
                  : { color: "default" }
              }
            >
              Yes, I hereby accept the{" "}
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
              of FitHub
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} direction="row">
          <CancelButton variant="contained" onClick={handleCancelSubmit}>
            Cancel
          </CancelButton>
          <StandardButton variant="contained" onClick={handlePublishContent}>
            Publish
          </StandardButton>
        </Stack>
        <Snackbar
          open={pubFailure}
          autoHideDuration={6000}
          onClose={() => setPubFailure(false)}
        >
          <Alert
            onClose={() => setPubFailure(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Publication of content failed!
          </Alert>
        </Snackbar>
        <Snackbar
          open={pubSuccess}
          autoHideDuration={1800}
          onClose={handlePublicationSuccess}
        >
          <Alert
            onClose={handlePublicationSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully published your content!
          </Alert>
        </Snackbar>
        <Snackbar
          open={checkFailure}
          autoHideDuration={1800}
          onClose={handleCheckFailure}
        >
          <Alert
            onClose={handleCheckFailure}
            severity="error"
            sx={{ width: "100%" }}
          >
            Mandatory checks missing!
          </Alert>
        </Snackbar>
      </Stack>
    </Stack>
  );
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, { addContent })(ContentUpload);
