import * as React from "react";
import {
  Alert,
  CircularProgress,
  Box,
  FormControlLabel,
  Checkbox,
  Divider,
  Stack,
  Typography,
  Radio,
  RadioGroup,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { HighlightButton } from "../components/buttons/highlight_button";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getContent } from "../redux/actions";
import { addboughtPlan } from "../redux/actions/boughtPlans";
import UserService from "../services/userService";

/**
 * Payment page with the most important information about the content item, a link to our Terms and Conditions the customer has to accept and the payment method selection.
 *
 * @param {*} props
 * @returns {JSX.Element}
 */
function Payment(props) {
  // Retrieve author of content item.
  const [author, setAuthor] = useState(null);

  // Function to fetch username from service.
  async function fetchUser() {
    return await UserService.userdata(singleContent.content.ownerId);
  }

  // get the user from redux
  const user = useSelector((state) => state.user);

  // Match url id to content item.
  const { id } = useParams();

  // get the content
  const singleContent = useSelector((state) => state.singleContent);

  // Trigger retrieval of states and backend data.
  useEffect(() => {
    if (!singleContent.content) {
      props.getContent(id);
    } else {
      fetchUser().then((res) => {
        setAuthor(res);
      });
    }
  }, [singleContent.content, id, props]);

  // if show is false, the standard payment view with payment method selection and terms and conditions accepting is displayed. If show true, only the paypal buttons will be displayed
  const [show, setShow] = useState(false);

  // state for payment method: by default payPal
  const [paymentMethod, setPaymentMethod] = React.useState("payPal");

  // change payment method to newly selected method
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // state for Terms and Conditions Checkbox
  const [termsChecked, setTermsChecked] = React.useState(false);

  // change acceptance state of the terms and conditions if the checkbox is clicked
  const handleTermsChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  // Snackbar states for terms and condition checkbox validation
  const [snackopen, setsnackOpen] = React.useState(false);

  // close the snackbar
  const handleSnackClose = () => {
    setsnackOpen(false);
  };

  // check if the terms and conditions are accepted; if accepted go to myplans; if not accepted open the snackbar to display an error message
  const handleSubmit = () => {
    if (termsChecked) {
      setShow(true);
    } else {
      setsnackOpen(true);
    }
  };

  // Handle navigation with react router.
  const navigate = useNavigate();

  // error handling during the payment process
  const [error, setError] = React.useState(null);

  // Snackbar states for terms and condition checkbox validation
  const [erroropen, setErrorOpen] = React.useState(false);

  // close the snackbar
  const handleErrorClose = () => {
    setError(null);
    setErrorOpen(false);
  };

  // publish the boudht plan to mongodb. After completing the database entry, the user is redirect to myplans
  async function publishboughtPlan() {
    try {
      await props.addboughtPlan({
        userId: user.user._id,
        contentId: id,
        price: singleContent.content.price,
        ownerId: singleContent.content.ownerId,
        title: singleContent.content.title,
      });
      navigate("/plans");
      window.location.reload();
    } catch (error) {
      setError("buying Plan failed!");
    }
  }

  // as soon as the payment is succesful, create the database entry for the transaction
  const handleApprove = (orderId) => {
    publishboughtPlan();
  };

  // error handling snackbar (if error occurs and the snackbar is not open yet.)
  if (error && !erroropen) {
    setErrorOpen(true);
  }

  // display popup if the user is not signed in or signed in as a content creator
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // redirect the user to the sign in page if not logged in
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/signin");
  };

  // if the user is not logged in -> must sign in
  if (!user.user && !dialogOpen) {
    setDialogOpen(true);
  }

  // if the user is logged in as a content creator -> must sign in as a customer
  if (user.user && !(user.user.role === "customer") && !dialogOpen) {
    setDialogOpen(true);
  }

  // check if content and author of content already loaded
  return !singleContent.content || !author ? (
    // Loading content.
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <CircularProgress />
    </Box>
  ) : (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AfSE031dbgxgbMRlT8Ec3OBL00O8o0dShOB_NIHd4vHg5tFVfLRGeERRMV9MZfcxG9_AhXwXZiG7vKRS",
        currency: "EUR",
      }}
    >
      <Stack spacing={3} marginBottom={10} marginTop={5} alignItems="center">
        <Stack
          padding={5}
          backgroundColor="#EEEEEE"
          sx={{
            width: { xs: "100%", md: "100%", lg: "80%", xl: "60%" },
            borderRadius: 5,
            boxShadow: 5,
          }}
        >
          <Typography variant="h1">{singleContent.content.title}</Typography>
          <Divider sx={{ mt: 3, bgcolor: "#222831" }} />
          <Divider sx={{ mt: 1, mb: 3, bgcolor: "#222831" }} />
          <Stack direction="row" spacing={3}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <img
                style={{ borderRadius: "8px", objectFit: "cover" }}
                width="300"
                height="220"
                src={singleContent.content.media[0]}
                alt={singleContent.content.title}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Stack>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Typography variant="h3">Title</Typography>
                  <Typography variant="h4">
                    {singleContent.content.title}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 2, bgcolor: "#222831" }} />
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Typography variant="h3">Content Creator</Typography>
                  <Typography variant="h4">
                    {author.firstname + " " + author.lastname}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 2, bgcolor: "#222831" }} />
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Typography variant="h3">Duration</Typography>
                  <Typography variant="h4">
                    {singleContent.content.duration} weeks with{" "}
                    {singleContent.content.intensity}{" "}
                    {singleContent.content.category === "nutrition"
                      ? "meals per day"
                      : "sessions per week"}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 2, bgcolor: "#222831" }} />
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Typography variant="h3">Price</Typography>
                  <Typography variant="h4">
                    {singleContent.content.price}€
                  </Typography>
                </Stack>
                <Divider sx={{ mt: 2, mb: 0, bgcolor: "#222831" }} />
              </Stack>
            </Box>
          </Stack>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={4}
            sx={{ mt: 2, ml: { xs: 3, md: 0 } }}
          >
            <Typography variant="h3">Description</Typography>
            <Typography variant="h4">
              {singleContent.content.description}
            </Typography>
          </Stack>
          <Divider sx={{ mt: 3, ml: { xs: 3, md: 0 }, bgcolor: "#222831" }} />
        </Stack>
        {show ? null : (
          <Box
            alignItems="flex-start"
            sx={{ width: { xs: "100%", md: "100%", lg: "80%", xl: "60%" } }}
          >
            <Typography variant="h2">Payment Options:</Typography>
          </Box>
        )}
        {show ? null : (
          <Stack
            paddingLeft={3}
            backgroundColor="#EEEEEE"
            sx={{
              width: { xs: "100%", md: "100%", lg: "80%", xl: "60%" },
              borderRadius: 2,
              boxShadow: 5,
            }}
          >
            <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
              <FormControlLabel
                control={<Radio />}
                value="payPal"
                label="PayPal"
              />
            </RadioGroup>
          </Stack>
        )}
        {show ? null : (
          <Box
            alignItems="flex-start"
            sx={{ width: { xs: "100%", md: "100%", lg: "80%", xl: "60%" } }}
          >
            <Typography variant="h2">Legal Notices:</Typography>
          </Box>
        )}
        {show ? null : (
          <Stack
            paddingLeft={3}
            direction="row"
            alignItems="center"
            backgroundColor="#EEEEEE"
            sx={{
              width: { xs: "100%", md: "100%", lg: "80%", xl: "60%" },
              borderRadius: 2,
              boxShadow: 5,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox checked={termsChecked} onChange={handleTermsChange} />
              }
              label={
                <Stack direction="row" spacing={0.5}>
                  <Typography>I have read the</Typography>
                  <Typography
                    component={RouterLink}
                    target="_blank"
                    color="inherit"
                    to={`/terms-and-conditions`}
                  >
                    Terms and Conditions{" "}
                  </Typography>
                </Stack>
              }
            />
          </Stack>
        )}
        {show ? null : (
          <HighlightButton
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Buy Now
          </HighlightButton>
        )}
        {show && (
          <PayPalButtons
            style={{
              layout: "vertical",
            }}
            onClick={(data, actions) => {
              return actions.resolve();
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: singleContent.content.title,
                    amount: {
                      value: parseFloat(
                        singleContent.content.price.replace(",", ".")
                      ),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              await actions.order.capture();
              handleApprove(data.orderID);
            }}
            onCancel={() => {
              setError("transaction canceled.");
            }}
            onError={() => {
              setError("transaction failed.");
            }}
          />
        )}
        <Snackbar
          open={snackopen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            You have to accept FitHub's Terms and Conditions before continuing.
          </Alert>
        </Snackbar>
        <Snackbar
          open={erroropen}
          autoHideDuration={6000}
          onClose={handleErrorClose}
        >
          <Alert
            onClose={handleErrorClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            An error occured during the payment process, please try again!
            Error: {error}
          </Alert>
        </Snackbar>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>
            You have to sign in as a customer before you can purchase a plan
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleDialogClose}>Okay</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </PayPalScriptProvider>
  );
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, { addboughtPlan, getContent })(Payment);
