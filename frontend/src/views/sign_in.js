import React, { useEffect } from "react";
import { TextField, Stack, Typography, Grid, Divider, } from "@mui/material";
import { HighlightButton } from "../components/buttons/highlight_button";
import { StandardButton } from "../components/buttons/standard_button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { signin } from "../redux/actions"
import UserService from "../services/userService";

/**
 * Signin View
 * @param {props} props for user state management
 */
function SignIn(props) {

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  // States for the email and password to send to the backend and check
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // States for displaying Error Messages and ensuring the signin data is changed after incorrect signin
  const [emailerror, setEmailError] = React.useState(false);
  const [passworderror, setPassworderror] = React.useState(false);
  const [emailerrormessage, setEmailErrorMessage] =React.useState("");

  // navigates to discovery once a user is logged in and reloads the page to ensure all data from the redux store is loaded
  useEffect(() => {
    if (user.user) {
      navigate("/discovery");
      window.location.reload();
    }
  }, [user, props.history, navigate]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setPassworderror(false);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPassworderror(false);
  };

  /**
   * Validates the entered Email adress to be a valid email Adress
   */
  const validateEmail = () => {
    if (
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
    ) {
      setEmailError(true);
      setEmailErrorMessage("Not a valid Email");
    } else {
      setEmailError(false);
      checkEmail();
    }
  };

  /**
   * Submits the data to the backend, if a user was not able to signin, sets the error states, so that a user can not signin again until either of the textfields is modified,
   * and displays a error message to the user
   */
  const handleSubmit = async () => {
    await props.dispatch(signin(email, password));
  };
  const checkEmail = async () => {
    const res = await UserService.checkEmail(email);
    if (res.alreadyHasAccount === false) {
        setEmailError(true);
        setEmailErrorMessage("No Account with this Email");
    };
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
          <Typography variant="h1">Sign In</Typography>
          <TextField
            label="Email-Adress"
            onChange={onChangeEmail}
            onBlur={validateEmail}
            helperText={
              emailerror
                ? emailerrormessage
                : ""
            }
            error={emailerror}
          ></TextField>
          <TextField
            label="Password"
            id="standard-password-input"
            type="password"
            variant="outlined"
            onChange={onChangePassword}
            error={passworderror}
          ></TextField>
          <HighlightButton
            variant="contained"
            onClick={handleSubmit}
            disabled={email === "" || password === "" || emailerror}
          >
            Sign-In
          </HighlightButton>
          <Divider>New to FitHub?</Divider>
          <StandardButton
            variant="contained"
            component={RouterLink}
            to={`/signup`}
          >
            Create your FitHub Account
          </StandardButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default connect()(SignIn);
