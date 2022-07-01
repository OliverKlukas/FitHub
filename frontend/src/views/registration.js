/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable valid-jsdoc */
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
} from "@mui/material";
import React from "react";
import { HighlightButton } from "../components/buttons/highlight_button";
import { Link as RouterLink } from "react-router-dom";
import UploadButton from "../components/buttons/upload_button";
import UserService from "../services/userService";

/**
 *
 * @param {props} props
 */
function Registration(props) {

    const [passworderror, setPasswordError] = React.useState(false);
    const [emailerror, setEmailError] = React.useState(false);
    const [errormessage, setErrorMessage] = React.useState("");

    const [snackopen, setsnackOpen] = React.useState(false); // States for Snackbar

    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [isContentCreator, setIsContentCreator] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [uploadedPicture, setUploadedPicture] = React.useState(false);

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
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePictureUpload = () => {
        setUploadedPicture(true);
    };

    /* Compares the Passwords and sends a error_Message when they are not equal, called on blur (so if left either of the pw texfields)*/
    const comparePasswords = () => {
        if (password !== "" && password2 !== "") {
            if (password !== password2) {
                setPasswordError(true);
                setErrorMessage("Passwords do not match");
                setsnackOpen(true);
            } else {
                setPasswordError(false);
            }
        }
    };

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
            setsnackOpen(true);
        } else {
            setEmailError(false);
        }
    };

    const handleSnackClose = () => {
        setsnackOpen(false);
    };

    const handleSubmit = async () => {
        if (isContentCreator) {
            const resp = await UserService.registerContentCreator(email, password, firstname, lastname,description,uploadedPicture);
            console.log(resp)
        } else {
            const resp = await UserService.registerCustomer(email, password, firstname, lastname);
            console.log(resp)
        }
    };
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
                            label="First Name"
                            onChange={onChangeFirstName}
                        ></TextField>
                        <TextField
                            label="Last Name"
                            onChange={onChangeLastName}
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
                                label="I want to upload and sell Fitness Content"
                                onChange={onChangeisContentCreator}
                            />
                            <FormControlLabel
                                value="Customer"
                                control={<Radio />}
                                label="I want to buy Fitness Content"
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
                        <Grid>
                            <TextField
                                alignItems="left"
                                multiline
                                minRows={5}
                                maxRows={5}
                                defaultValue="You can enter a short a description of yourself and the content you create, this description can always be edited through your profile page"
                                onChange={onChangeDescription}
                            ></TextField>
                            <Typography variant="h4">Upload a Profile Picture</Typography>
                            <UploadButton
                                id="markting-upload"
                                uploadFormat="image/*"
                                givenId="marketing-upload"
                                multiUpload={false}
                                onClick={onChangePictureUpload}
                            />
                        </Grid>
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
                            (isContentCreator && description === "") ||
                            (isContentCreator && uploadedPicture === "")
                        }
                    >
                        Save and Submit
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
                    <Snackbar
                        open={snackopen}
                        autoHideDuration={6000}
                        onClose={handleSnackClose}
                        message={errormessage}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default (Registration);
