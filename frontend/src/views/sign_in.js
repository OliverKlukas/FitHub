import * as React from "react";
import { TextField, Stack, Typography, Grid, Divider } from "@mui/material";
import { HighlightButton } from "../components/buttons/highlight_button";
import { StandardButton } from "../components/buttons/standard_button";
import { Link as RouterLink } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = React.useState("");
  const [emailerror, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [errormessage, setErrorMessage] =
    React.useState(
      ""
    ); /* PLaceholder if we want to extend with further error Message */

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
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
    } else {
      setEmailError(false);
    }
  };
  const handleSubmit = () => {
    /* TODO BackendLogic  */
  };
  const handleButtonToRegistration = () => {
    /* Placeholder in case we still want something to be done with this button and not just link */
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
            error={emailerror}
          ></TextField>
          <TextField
            label="Password"
            id="standard-password-input"
            type="password"
            variant="standard"
            onChange={onChangePassword}
          ></TextField>
          <HighlightButton
            variant="contained"
            onClick={handleSubmit}
            component={RouterLink}
            to={`/plans`}
            disabled={email === "" || password === "" || emailerror}
          >
            Sign-In
          </HighlightButton>
          <Divider>New to FitHub?</Divider>
          <StandardButton
            variant="contained"
            onClick={handleButtonToRegistration}
            component={RouterLink}
            to={`/registration`}
          >
            Create your FitHub Account
          </StandardButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SignIn;
