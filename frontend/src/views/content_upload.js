import * as React from "react";
import { Grid, Stack, Typography, Link, Snackbar } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import EuroSymbol from "@mui/icons-material/Euro";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import { StandardButton } from "../components/buttons/standard_button";
import { CancelButton } from "../components/buttons/cancel_button";
import Autocomplete from "@mui/material/Autocomplete";
import UploadButton from "../components/buttons/upload_button";
import { useNavigate, useParams } from "react-router-dom";
import {useState} from "react";
import {connect} from "react-redux";
import {addContent} from "../redux/actions";

const preInputValue = "Type here...";
const fitnessGoal = ["weight-loss", "weight-gain", "muscle-growth", "cardio"];
const fitnessLevel = ["beginner", "advanced", "professional"];
const lifestyle = ["vegan", "vegetarian", "pescatarian", "meat-based"];

function ContentUpload(props) {
  const { selectedCategory } = useParams();

  // Handle navigation with react router.
  const navigate = useNavigate();

  // Hooks to save filled out upload form.
  const [category, setCategory] = useState(selectedCategory);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState();
  const [intensity, setIntensity] = useState();
  const [goalTags, setGoalTags] = useState([]);
  const [levelTags, setLevelTags] = useState([]);
  const [lifestyleTags, setLifestyleTags] = useState([]);
  const [support, setSupport] = useState(false);

  function handleCancelSubmit(event) {
    event.preventDefault();
    navigate(`/landing`);
  }

  // Merge all hooks together and publish it to mongodb.
  function publishContent(){
    props.addContent({
      category: category,
      title: title,
      description: description,
      price: price,
      duration: duration,
      intensity: intensity,
      support: support,
      tags: goalTags.concat(levelTags, lifestyleTags),
      featured: false,
    })
  }

  return (
    <Stack spacing={2}>
      <Grid
        item
        container
        paddingLeft="1px"
        paddingRight="25px"
        paddingBottom="25px"
        backgroundColor="#EEEEEE"
        borderRadius="8px"
        spacing={2}
        width="90%"
        justifyContent="flex-start"
      >
        <Grid item xs={12}>
          <Typography variant="h1" fontWeight="bold">
            Offer your Content
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">General Information</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Stack spacing={3} direction="row" alignItems="center">
              <Grid item sx={{ minWidth: 100 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Category:
                </Typography>
              </Grid>
              <RadioGroup
                row
                aria-labelledby="category-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <FormControlLabel
                  value="training"
                  control={<Radio />}
                  label="Training Plan"
                />
                <FormControlLabel
                  value="nutrition"
                  control={<Radio />}
                  label="Nutrition Plan"
                />
                <FormControlLabel
                  value="coaching"
                  control={<Radio />}
                  label="Coaching"
                />
              </RadioGroup>
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row" alignItems="baseline">
            <Grid item sx={{ minWidth: 100 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Title:
              </Typography>
            </Grid>
            <TextField
              // error
              id="title-input"
              placeholder={preInputValue}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              helperText="Please enter a short and catchy title that best describes your fitness offering"
              variant="filled"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2} direction="row" alignItems="baseline">
            <Grid item sx={{ minWidth: 100 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Price:
              </Typography>
            </Grid>
            <TextField
              // error
              id="price-input"
              placeholder={preInputValue}
              value={price}
              onChange={(event) => setPrice(parseInt(event.target.value))}
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
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row" alignItems="baseline">
            <Grid item sx={{ minWidth: 100 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Description:
              </Typography>
            </Grid>
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
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Grid item sx={{ minWidth: 100 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Scope:
              </Typography>
            </Grid>
            <Stack spacing={2} direction="row">
              <Grid>
                <TextField
                  id="duration-input"
                  label="Duration"
                  multiline
                  value={duration}
                  onChange={(event) => setDuration(parseInt(event.target.value))}
                  type="number"
                  variant="filled"
                  placeholder={preInputValue}
                  helperText="amount of weeks"
                  size="small"
                />
              </Grid>
              <Grid>
                <TextField
                  id="intensity-input"
                  label="Intensity"
                  multiline
                  value={intensity}
                  onChange={(event) => setIntensity(parseInt(event.target.value))}
                  variant="filled"
                  placeholder={preInputValue}
                  helperText="trainings per week"
                  size="small"
                />
              </Grid>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Grid item sx={{ minWidth: 100 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Tags:
              </Typography>
            </Grid>
            <Grid item sx={{ minWidth: 250, maxWidth: 400 }}>
              <Stack spacing={3}>
                <Autocomplete
                  multiple
                  id="goal-tags"
                  options={fitnessGoal}
                  value={goalTags}
                  onChange={(event, value) => setGoalTags(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Fitness Goal" />
                  )}
                />
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
              </Stack>
            </Grid>
            <Grid item sx={{ minWidth: 250, maxWidth: 300 }}>
              <Stack spacing={3}>
                <Autocomplete
                  multiple
                  id="level-tags"
                  options={fitnessLevel}
                  value={levelTags}
                  onChange={(event, value) => setLevelTags(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Fitness Level" />
                  )}
                />
                <Typography variant="body2" fontSize="small">
                  Please type and select fitting tags for your content offering.
                  These will be used to better reach your target user group on
                  FitHub.
                </Typography>
              </Stack>
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3">Uploads</Typography>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Grid item sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1">Marketing Material:</Typography>
            </Grid>
            <Stack spacing={1}>
              <UploadButton
                id="markting-upload"
                uploadFormat="image/*"
                givenId="marketing-upload"
                multiUpload={true}
              />
              <Grid item xs={4.5}>
                <Typography variant="body2" fontSize="small">
                  Please upload pictures that represents your offer (example
                  dishes, workouts etc). Be aware and respect our{" "}
                  <Link
                    color="#393E46"
                    fontSize={14}
                    fontWeight={300}
                    underline="always"
                    href="/terms-and-conditions"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  including image rights
                </Typography>
              </Grid>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Grid item sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1">Full Plan:</Typography>
            </Grid>
            <Stack spacing={1}>
              <UploadButton
                uploadFormat=".pdf"
                givenId="plan-upload"
                multiUpload={false}
              />
              <Grid item xs={5}>
                <Typography variant="body2" fontSize="small">
                  Please upload the pdf file that contains the complete training
                  plan that buyers are going to receive
                </Typography>
              </Grid>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Grid item sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1">Sample:</Typography>
            </Grid>
            <Stack spacing={1}>
              <UploadButton
                uploadFormat=".pdf"
                givenId="sample-upload"
                multiUpload={false}
              />
              <Grid item xs={5}>
                <Typography variant="body2" fontSize="small">
                  Please upload a sample pdf file which gives buyers an
                  impression of the full plan
                </Typography>
              </Grid>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3">Legal Notices</Typography>
        </Grid>
        <Grid item xs={10}>
          <Stack item spacing={0.5}>
            <Stack direction="row" alignItems="center">
              <Checkbox />
              <Typography variant="body1">
                Yes, EMail me for marketing events like vouchers & sales
                weekends
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Checkbox value={support} onChange={(event) => setSupport(event.target.checked)}/>
              <Typography variant="body1">
                Yes, I am offering full-time support for the buyers
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Checkbox />
              <Typography variant="body1">
                Yes, I ensure delivery of the expected quality and know
                intentional fooling attempts will result in penalties like an
                account ban
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Checkbox />
              <Typography variant="body1">
                Yes, I hereby accept the{" "}
                <Link
                  color="#393E46"
                  fontSize={14}
                  fontWeight={300}
                  underline="always"
                  href="/terms-and-conditions"
                >
                  Terms & Conditions
                </Link>{" "}
                of FitHub
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <form onSubmit={handleCancelSubmit}>
              <FormControl>
                <CancelButton variant="contained" type="submit">
                  Cancel
                </CancelButton>
              </FormControl>
            </form>
            <StandardButton variant="contained" onChange={publishContent}>Publish</StandardButton>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, addContent)(ContentUpload);
