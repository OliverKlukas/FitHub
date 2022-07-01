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
            </Grid>

            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={10}>
            </Grid>
            <Grid item xs={12}>
            </Grid>
        </Grid>);
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, {addContent})(ContentUpload);
