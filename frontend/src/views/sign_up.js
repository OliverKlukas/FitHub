import {
    TextField,
    Stack,
    Typography,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    Link,
} from "@mui/material";
import React, { useEffect } from "react";
import { HighlightButton } from "../components/buttons/highlight_button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import UploadButton from "../components/buttons/upload_button";
import { registerContentCreator, registerCustomer } from "../redux/actions";
import { connect, useSelector } from "react-redux";
import UserService from "../services/userService";
import { red } from "@mui/material/colors";

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
    const [titleerror, setTitleError] = React.useState(false);
    const [firstnameerror, setFirstNameError] = React.useState(false);
    const [lastnameerror, setLastNameError] = React.useState(false);
    const [neitherselectererror, setNeitherSelectedError] = React.useState(true);
    const [mediaError, setMediaError] = React.useState(false);

    // states for input to pass to the backend
    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [isContentCreator, setIsContentCreator] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [uploadedPicture, setUploadedPicture] = React.useState("");

    // States for Error Messages
    const [emailerrormessage, setEmailErrorMessage] = React.useState("");
    const [passworderrormessage, setPasswordErrorMessage] = React.useState("")

    useEffect(() => {
        if (user.user) {
            if (isContentCreator) {
                navigate("/landing");
            } else {
                navigate("/discovery")
            }

            window.location.reload();
        }
    }, [user, props.history, navigate, isContentCreator]);


    /**
     * calls the redux logic to dispatch the entered Information
     */
    const handleSubmit = () => {
        if (isContentCreator) {
            props.dispatch(registerContentCreator(email, password, firstname, lastname, title, uploadedPicture[0]))
        } else {
            props.dispatch(registerCustomer(email, password, firstname, lastname))
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
        setNeitherSelectedError(false);
    };
    const onChangeisNotContentCreator = () => {
        setIsContentCreator(false);
        setNeitherSelectedError(false);
    };
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    /**
     * First Checks if the Password is secure enough, it needs at least 8 letters, at least 2 lower case, at least 1 Uppercase, at least 0 sign and at least 1 numbers to be secure enough;
     * If it is secure enough, it checks if the two passwords match
     */
    const validatePasswords = () => {
        const pwregex = new RegExp(/^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){0,}).{8,}$/)
        if (pwregex.test(password)) {
            setPasswordError(false)
            if (password !== "" && password2 !== "") {
                if (password !== password2) {
                    setPasswordError(true);
                    setPasswordErrorMessage("Passwords do not match");
                } else {
                    setPasswordError(false);
                }
            }
        } else {
            setPasswordError(true);
            setPasswordErrorMessage("Password needs at least 2 lowercase, 1 uppercase, 1 number and at least 8 letters");
        }
    };
    // validates email adress, checks for valid types of emails
    const validateEmail = () => {
        if (
            email
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) === null
        ) {
            setEmailError(true);
            setEmailErrorMessage("Not a email");
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
            setEmailErrorMessage("Email is already in use");
        };
    };

    // validates FirstName, checks if input is too long and any numbers or signs in the first name, unicodes allow umlaute, greek phylix, french acents, also allows emtpy spaces
    const validateFirstName = () => {
        if (
            firstname
                .match(
                    /^[A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF_ ]+$/
                ) === null
        ) {
            setFirstNameError(true);
            ;
        } else {
            setFirstNameError(false);
        }
    }
    // validates LastName, checks if input is too long and any numbers or signs in the last name, unicodes allow umlaute, greek phylix, french acents, also allows emtpy spaces
    const validateLastName = () => {
        if (
            lastname
                .match(
                    /^[A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF_ ]+$/
                ) === null
        ) {
            setLastNameError(true);
        } else {
            setLastNameError(false);
        }
    }
    // validates Title, check if the input is too long or too short, 5-80 characters
    const validateTitle = () => {
        const titleregex = new RegExp("^(?=(.*[a-z]){2,})(?=(.*[A-Z]){0,})(?=(.*[0-9]){0,})(?=(.*[!@#$%^&*()/-__+. ]){0,}).{5,80}$")
        if (
            titleregex.test(title)
        ) {
            setTitleError(false);
        } else {
            setTitleError(true);
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
            <Grid item xs={1}>
                <Stack direction="column" spacing={3} alignItems="flexstart">
                    <Typography variant="h1">Create account</Typography>
                    <Typography variant="h4">Your name</Typography>
                    <Stack direction="row" spacing={5}>
                        <TextField
                            sx={{ maxWidth: 180 }}
                            label="First Name"
                            onChange={onChangeFirstName}
                            error={firstnameerror}
                            onBlur={validateFirstName}
                            helperText={
                                firstnameerror
                                    ? "First name is empty, too long or contains signs and numbers"
                                    : ""
                            }
                        ></TextField>
                        <TextField
                            sx={{ maxWidth: 180 }}
                            label="Last Name"
                            onChange={onChangeLastName}
                            error={lastnameerror}
                            onBlur={validateLastName}
                            helperText={
                                lastnameerror
                                    ? "Last name is empty, too long or contains signs and numbers"
                                    : ""
                            }
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
                        sx={{ maxWidth: 500 }}
                        label="Email"
                        onChange={onChangeEmail}
                        onBlur={validateEmail}
                        error={emailerror}
                        helperText={
                            emailerror
                                ? emailerrormessage
                                : ""
                        }
                    ></TextField>
                    <Typography variant="h4">Choose a Password</Typography>
                    <Stack direction="row" spacing={5}>
                        <TextField
                            sx={{ maxWidth: 180 }}
                            label="Password"
                            id="passwordInputOne"
                            type="password"
                            variant="standard"
                            onChange={onChangePassword}
                            error={passworderror}
                            onBlur={validatePasswords}
                            helperText={
                                passworderror
                                    ? passworderrormessage
                                    : ""
                            }
                        ></TextField>
                        <TextField
                            sx={{ maxWidth: 180 }}
                            label="Repeat Password"
                            id="passwordInputTwo"
                            type="password"
                            variant="standard"
                            onChange={onChangePassword2}
                            error={passworderror}
                            onBlur={validatePasswords}
                            helperText={
                                passworderror
                                    ? passworderrormessage
                                    : ""
                            }
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
                                helperText={
                                    titleerror
                                        ? "Title needs to be at least 5 and at most 80 characters"
                                        : ""
                                }
                            ></TextField>
                            <Typography variant="h4">Upload a Profile Picture</Typography>
                            <Stack spacing={1}>
                                <UploadButton
                                    uploadFormat="image/*"
                                    givenId="profilePictureUpload"
                                    multiUpload={false}
                                    setUpload={setUploadedPicture}
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
                                    Be aware of the max size of 16MB and respect our{" "}
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
                            neitherselectererror ||
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
