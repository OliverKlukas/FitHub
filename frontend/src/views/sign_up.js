import {
    TextField,
    Stack,
    Snackbar,
    Typography,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import { HighlightButton } from "../components/buttons/highlight_button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import UploadButton from "../components/buttons/upload_button";
import { registerContentCreator, registerCustomer } from "../redux/actions";
import { connect, useSelector } from "react-redux";
import UserService from "../services/userService";

/**
 * SignUp View
 * @param {props} props for user state management
 */
function SignUp(props) {

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    // Error States for Input Validation
    const [passworderror, setPasswordError] = React.useState(false);
    const [emailerror, setEmailError] = React.useState(false);
    const [errormessage, setErrorMessage] = React.useState("");
    const [titleerror, setTitleError] = React.useState(false);
    const [firstnameerror, setFirstNameError] = React.useState(false);
    const [lastnameerror, setLastNameError] = React.useState(false);
    // States for Snackbar
    const [snackopen, setSnackOpen] = React.useState(false);

    // states for input to pass to the backend
    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [isContentCreator, setIsContentCreator] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [uploadedPicture, setUploadedPicture] = React.useState("");

    useEffect(() => {
        if (user.user) {
            navigate("/landing");
            window.location.reload();
        }
    }, [user, props.history, navigate]);

    const handleSubmit = () => {
        if (isContentCreator) {
            props.dispatch(registerContentCreator(email, password, firstname, lastname, title, uploadedPicture[0])).catch(err => console.log(err));
        } else {
            props.dispatch(registerCustomer(email, password, firstname, lastname)).catch(err => console.log(err));
        }
    }
    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError(false);
    };
    const onChangePassword2 = (e) => {
        setPassword2(e.target.value);
        setPasswordError(false);
    };
    const onChangeisContentCreator = () => {
        setIsContentCreator(true);
    };
    const onChangeisNotContentCreator = () => {
        setIsContentCreator(false);
    };
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    /* Compares the Passwords and sends a error_Message when they are not equal, called on blur (so if left either of the pw texfields)*/
    const comparePasswords = () => {
        if (password !== "" && password2 !== "") {
            if (password !== password2) {
                setPasswordError(true);
                setErrorMessage("Passwords do not match");
                setSnackOpen(true);
            } else {
                setPasswordError(false);
            }
        }
    };
    // validates email adress, checks for valid types of emails
    const validateEmail = () => {
        if (
            email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) === null
        ) {
            setEmailError(true);
            setErrorMessage("Not a email");
            setSnackOpen(true);
        } else {
            setEmailError(false);
            checkEmail()
        }
    };
    //gets a boolean of whether a email is already registered or from the backend
    const checkEmail = async () => {
        const res = await UserService.checkEmail(email);
        if (res.alreadyHasAccount) {
            setEmailError(true);
            setErrorMessage("Email is already in use");
            setSnackOpen(true);
        };
    };
    
    // validates FirstName, checks if input is too long and any numbers or signs in the first name, unicodes allow umlaute, greek phylix, french acents, also allows emtpy spaces
    const validateFirstName = () => {
        if (
            firstname
                .toLowerCase()
                .match(
                    /^[A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF_ ]+$/
                ) === null
        ) {
            setFirstNameError(true);
            setErrorMessage("First name is too long or contains signs and/or numbers");
            setSnackOpen(true);
        } else {
            setFirstNameError(false);
        }
    }
    // validates LastName, checks if input is too long and any numbers or signs in the last name, unicodes allow umlaute, greek phylix, french acents, also allows emtpy spaces
    const validateLastName = () => {
        if (
            lastname
                .toLowerCase()
                .match(
                    /^[A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF_ ]+$/
                ) === null
        ) {
            setLastNameError(true);
            setErrorMessage("Last name is too long or contains signs and/or numbers");
            setSnackOpen(true);
        } else {
            setLastNameError(false);
        }
    }
    // validates Title, check if the input is too long or too short (TODO)
    const validateTitle = () => {
        if (
            title
                .toLowerCase()
                .match(
                    /^[A-Za-z-9À-ž\u0370-\u03FF\u0400-\u04F0_ ]+$/
                ) === null
        ) {
            setTitleError(true);
            setErrorMessage("Title is too long");
            setSnackOpen(true);
        } else {
            setTitleError(false);
        }
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "50vh" }}
        >
            <Snackbar open={snackopen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
                <Alert onClose={() => setSnackOpen(false)} severity="error" sx={{ width: '100%' }}> {errormessage} </Alert>
            </Snackbar>
            <Grid item xs={1}>
                <Stack direction="column" spacing={3} alignItems="flexstart">
                    <Typography variant="h1">Create account</Typography>
                    <Typography variant="h4">Your name</Typography>
                    <Stack direction="row" spacing={5}>
                        <TextField
                            label="First Name"
                            onChange={onChangeFirstName}
                            error={firstnameerror}
                            onBlur={validateFirstName}
                        ></TextField>
                        <TextField
                            label="Last Name"
                            onChange={onChangeLastName}
                            error={lastnameerror}
                            onBlur={validateLastName}
                        ></TextField>
                    </Stack>
                    <FormControl>
                        <FormLabel id="Account_Type_Selector">Account Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="Account_Type_Selector"
                            name="Account Type"
                        >
                            <FormControlLabel
                                value="Content Creator"
                                control={<Radio />}
                                label="I want to upload and sell fitness content"
                                onChange={onChangeisContentCreator}
                            />
                            <FormControlLabel
                                value="Customer"
                                control={<Radio />}
                                label="I want to buy fitness content"
                                onChange={onChangeisNotContentCreator}
                            />
                        </RadioGroup>
                    </FormControl>
                    <Typography variant="h4" inputtype="email">
                        Email
                    </Typography>
                    <TextField
                        label="Email"
                        onChange={onChangeEmail}
                        onBlur={validateEmail}
                        error={emailerror}
                    ></TextField>
                    <Typography variant="h4">Choose a Password</Typography>
                    <Stack direction="row" spacing={10}>
                        <TextField
                            label="Password"
                            id="standard-password-input"
                            type="password"
                            variant="standard"
                            onChange={onChangePassword}
                            error={passworderror}
                            onBlur={comparePasswords}
                        ></TextField>
                        <TextField
                            label="Repeat Password"
                            id="standard-password-input"
                            type="password"
                            variant="standard"
                            onChange={onChangePassword2}
                            error={passworderror}
                            onBlur={comparePasswords}
                        ></TextField>
                    </Stack>
                    {isContentCreator && (
                        <Stack direction="column" spacing={3}>
                            <Typography variant="h4">Title</Typography>
                            <TextField
                                alignitems="center"
                                label="Enter a short title that best describes your content"
                                onChange={onChangeTitle}
                                error={titleerror}
                                onBlur={validateTitle}
                            ></TextField>
                            <Typography variant="h4">Upload a Profile Picture</Typography>
                            <UploadButton
                                id="profilePictureUpload"
                                uploadFormat="image/*"
                                givenId="profilePicture-Upload"
                                multiUpload={false}
                                setUpload={setUploadedPicture}
                            />
                        </Stack>
                    )}
                    <HighlightButton
                        variant="contained"
                        onClick={handleSubmit}
                        // TODO add link again once submit is working
                        disabled={
                            firstname === "" ||
                            lastname === "" ||
                            password === "" ||
                            password2 === "" ||
                            passworderror ||
                            email === "" ||
                            password !== password2 ||
                            emailerror ||
                            (isContentCreator && title === "") ||
                            (isContentCreator && uploadedPicture === "")
                        }
                    >
                        Sign up
                    </HighlightButton>
                    <Stack direction="row" alignItems="center">
                        <Typography variant="caption">
                            By creating an account I agree to the
                        </Typography>

                        <Typography
                            component={RouterLink}
                            to={`/terms-and-conditions`}
                            target="'_blank"
                            paddingLeft={0.5}
                            variant="caption"
                        >
                            Terms & Conditions
                        </Typography>
                    </Stack>

                </Stack>
            </Grid>
        </Grid>
    );
}

export default connect()(SignUp);
