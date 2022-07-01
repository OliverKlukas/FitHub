import * as React from "react";
import {Grid, Stack, Typography, Link, Snackbar, Box} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import EuroSymbol from "@mui/icons-material/Euro";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import UploadButton from "../components/buttons/upload_button";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {connect} from "react-redux";
import {addContent} from "../redux/actions";
import Checkbox from "@mui/material/Checkbox";
import {CancelButton} from "../components/buttons/cancel_button";
import {StandardButton} from "../components/buttons/standard_button";

const preInputValue = "Type here...";
const fitnessGoal = ["weight-loss", "weight-gain", "muscle-growth", "cardio"];
const fitnessLevel = ["beginner", "advanced", "professional"];
const lifestyle = ["vegan", "vegetarian", "pescatarian", "meat-based"];

function ContentUpload(props) {
    const {selectedCategory} = useParams();

    // Handle navigation with react router.
    const navigate = useNavigate();

    // Hooks to save filled out upload form, all need pre-defined value.
    const [category, setCategory] = useState(selectedCategory);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [intensity, setIntensity] = useState("");
    const [goalTags, setGoalTags] = useState([]);
    const [levelTags, setLevelTags] = useState([]);
    const [lifestyleTags, setLifestyleTags] = useState([]);
    const [support, setSupport] = useState(false);

    function handleCancelSubmit() {
        navigate("/landing");
    }

    // Merge all hooks together and publish it to mongodb.
    async function publishContent(event) {
        event.preventDefault();
        try {
            // TODO: fix waiting for a response here to not go to standard
            const response = await props.addContent({
                category: category,
                title: title,
                description: description,
                price: parseInt(price),
                duration: parseInt(duration),
                intensity: parseInt(intensity),
                support: support,
                tags: goalTags.concat(levelTags, lifestyleTags),
                featured: false,
            });
            navigate("/");
        } catch(error) {
            console.log(error);
        }

    }

    return (<Stack
        padding={3}
        backgroundColor="#EEEEEE"
        borderRadius="8px"
        spacing={2}
        width="90%"
    >
        <Typography variant="h1" fontWeight="bold">
            Offer your Content
        </Typography>
        <Typography variant="h3">General Information</Typography>
        <Stack spacing={3} direction="row" alignItems="center">
            <Typography sx={{minWidth: 100}} variant="subtitle1" fontWeight="bold">
                Category:
            </Typography>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="category-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <FormControlLabel
                        value="training"
                        control={<Radio/>}
                        label="Training Plan"
                    />
                    <FormControlLabel
                        value="nutrition"
                        control={<Radio/>}
                        label="Nutrition Plan"
                    />
                    <FormControlLabel
                        value="coaching"
                        control={<Radio/>}
                        label="Coaching"
                    />
                </RadioGroup>
            </FormControl>
        </Stack>
        <Stack spacing={2} direction="row" alignItems="baseline">
            <Typography sx={{minWidth: 100}} variant="subtitle1" fontWeight="bold">
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
            <Typography sx={{minWidth: 100}} variant="subtitle1" fontWeight="bold">
                Price:
            </Typography>
            <TextField
                sx={{maxWidth: 200}}
                id="price-input"
                placeholder={preInputValue}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                helperText="Prices must include VAT and represent the total costs you expect buyers to pay"
                variant="filled"
                size="small"
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <EuroSymbol/>
                    </InputAdornment>),
                }}
            />
        </Stack>
        <Stack spacing={2} direction="row" alignItems="baseline">
            <Typography sx={{minWidth: 100}} variant="subtitle1" fontWeight="bold">
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
            <Typography sx={{minWidth: 100}} variant="subtitle1" fontWeight="bold">
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
                    helperText="Trainings per week"
                    size="small"
                />
            </Stack>
        </Stack>
        <Stack spacing={2} direction="row">
            <Typography sx={{minWidth: 100}} variant="subtitle1" fontWeight="bold">
                Tags:
            </Typography>
            <Box>
                <Grid container justifyContent="flex-start" maxWidth={600} spacing={3} columns={{xs: 1, sm: 2}}>
                    <Grid item xs={1} sm={1}>
                        <Autocomplete
                            multiple
                            id="goal-tags"
                            options={fitnessGoal}
                            value={goalTags}
                            onChange={(event, value) => setGoalTags(value)}
                            renderInput={(params) => (<TextField {...params} label="Fitness Goal"/>)}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Autocomplete
                            multiple
                            id="goal-tags"
                            options={lifestyle}
                            value={lifestyleTags}
                            onChange={(event, value) => setLifestyleTags(value)}
                            renderInput={(params) => (<TextField {...params} label="Lifestyle"/>)}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Autocomplete
                            multiple
                            id="level-tags"
                            options={fitnessLevel}
                            value={levelTags}
                            onChange={(event, value) => setLevelTags(value)}
                            renderInput={(params) => (<TextField {...params} label="Fitness Level"/>)}
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
            <Typography sx={{minWidth: 200}} variant="subtitle1">Marketing Material:</Typography>
            <Stack spacing={1}>
                <UploadButton
                    uploadFormat="image/*" givenId="marketing-upload" multiUpload={true}                />
                <Typography variant="body2" fontSize="small" maxWidth={300}>
                    Please upload pictures that represents your offer (example
                    dishes, workouts etc). Be aware and respect our  <Link
                    color="#393E46"
                    fontSize={14}
                    fontWeight={300}
                    underline="always"
                    href="/terms-and-conditions"
                >Terms & Conditions</Link>  including image rights
                </Typography>
            </Stack>
        </Stack>
        <Stack spacing={2} direction="row">
            <Typography sx={{minWidth: 200}} variant="subtitle1">Full Plan:</Typography>
            <Stack spacing={1}>
                <UploadButton

                    uploadFormat=".pdf"
                    givenId="plan-upload"
                    multiUpload={false}
                />
                    <Typography variant="body2" fontSize="small" maxWidth={300}>
                        Please upload the pdf file that contains the complete training
                        plan that buyers are going to receive
                    </Typography>
            </Stack>
        </Stack>
        <Stack spacing={2} direction="row">
                <Typography sx={{minWidth: 200}} variant="subtitle1">Sample:</Typography>
            <Stack spacing={1}>
                <UploadButton
                    uploadFormat=".pdf"
                    givenId="sample-upload"
                    multiUpload={false}
                />
                <Typography variant="body2" fontSize="small" maxWidth={300}>
                    Please upload a sample pdf file which gives buyers an
                    impression of the full plan
                </Typography>
            </Stack>
        </Stack>
        <Typography variant="h3">Legal Notices</Typography>
        <Stack spacing={0.5}>
            <Stack direction="row" alignItems="center">
                <Checkbox/>
                <Typography variant="body1">
                    Yes, email me for marketing events like vouchers & sales weekends
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
                <Checkbox value={support} onChange={(event) => setSupport(event.target.checked)}/>
                <Typography variant="body1">
                    Yes, I am offering full-time support for the buyers
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
                <Checkbox/>
                <Typography variant="body1">
                    Yes, I ensure delivery of the expected quality and know
                    intentional fooling attempts will result in penalties like an
                    account ban
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
                <Checkbox/>
                <Typography variant="body1">
                    Yes, I hereby accept the  <Link
                        color="#393E46"
                        fontSize={14}
                        fontWeight={300}
                        underline="always"
                        href="/terms-and-conditions"
                    >Terms & Conditions</Link>  of FitHub
                </Typography>
            </Stack>
        </Stack>
        <Stack spacing={2} direction="row">
            <CancelButton variant="contained" onClick={handleCancelSubmit}>Cancel</CancelButton>
            <StandardButton variant="contained" onClick={publishContent}>Publish</StandardButton>
        </Stack>
    </Stack>);
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, {addContent})(ContentUpload);
