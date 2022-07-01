import * as React from "react";
import {Grid, Stack, Typography, Link, Snackbar} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import EuroSymbol from "@mui/icons-material/Euro";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import {StandardButton} from "../components/buttons/standard_button";
import {CancelButton} from "../components/buttons/cancel_button";
import Autocomplete from "@mui/material/Autocomplete";
import UploadButton from "../components/buttons/upload_button";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {connect} from "react-redux";
import {addContent} from "../redux/actions";

const preInputValue = "Type here...";
const fitnessGoal = ["weight-loss", "weight-gain", "muscle-growth", "cardio"];
const fitnessLevel = ["beginner", "advanced", "professional"];
const lifestyle = ["vegan", "vegetarian", "pescatarian", "meat-based"];

function ContentUpload(props) {
    const {selectedCategory} = useParams();

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

    function handleCancelSubmit() {
        navigate(`/landing`);
    }

    // Merge all hooks together and publish it to mongodb.
    function publishContent() {
        console.log({
            category: category,
            title: title,
            description: description,
            price: price,
            duration: duration,
            intensity: intensity,
            support: support,
            tags: goalTags.concat(levelTags, lifestyleTags),
            featured: false,
        });
        const res = props.addContent({
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
        console.log(res);
    }

    return (<Grid
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
            </Grid>

            <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                    <Grid item sx={{minWidth: 200}}>
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
                    <Grid item sx={{minWidth: 200}}>
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
                        <Checkbox/>
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
                            Yes, I hereby accept the
                            <Link
                                color="#393E46"
                                fontSize={14}
                                fontWeight={300}
                                underline="always"
                                href="/terms-and-conditions"
                            >
                                Terms & Conditions
                            </Link>
                            of FitHub
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                    <CancelButton variant="contained" onClick={handleCancelSubmit}>Cancel</CancelButton>
                    <StandardButton variant="contained" onClick={publishContent}>Publish</StandardButton>
                </Stack>
            </Grid>
        </Grid>);
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, {addContent})(ContentUpload);
