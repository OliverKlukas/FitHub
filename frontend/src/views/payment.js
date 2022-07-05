import * as React from "react";
import { Alert, CircularProgress, Box, FormControlLabel, Checkbox, Divider, Stack, Typography, Radio, RadioGroup, Snackbar } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { HighlightButton } from "../components/buttons/highlight_button";
import { PaypalCheckoutButton } from "../components/buttons/paypal_button";
import { content } from "../utils/content";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getContent } from "../redux/actions";

/**
 * Payment page with the most important information about the content item, a link to our Terms and Conditions the customer has to accept and the payment method selection.
 *
 * @returns {JSX.Element} Returns payment page.
 */
function Payment(props) {
    // TODO: once user is connected I need the info from there
    const author = {
        name: "Simon Plashek",
        title: "professional bodybuilder & fitness coach",
        img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50",
        rating: 3,
    };

    // Match url id to content item.
    const { id } = useParams();
    const singleContent = useSelector((state) => {
        return state.singleContent;
    });

    // On open load the movie.
    useEffect(() => {
        props.getContent(id);
    }, [singleContent.content]);

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
            //navigate(`/myplans/2000`);
        } else {
            setsnackOpen(true);
        }
    };

    return !singleContent.content && !singleContent.error ? (
        // Loading content.
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress />
        </Box>
    ) : singleContent.error ? (
        <Alert severity="error">Loading content went wrong, sorry!</Alert>
    ) : (
        <PayPalScriptProvider options={{ "client-id": "AfSE031dbgxgbMRlT8Ec3OBL00O8o0dShOB_NIHd4vHg5tFVfLRGeERRMV9MZfcxG9_AhXwXZiG7vKRS", currency: "EUR" }}>
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
                            {singleContent.content.media.map((data, index) => (
                                <img width="100%" height="100%" key={index} src={data} style={{ objectFit: "cover" }} />
                            ))}
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Stack>
                                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4}>
                                    <Typography variant="h3">Title</Typography>
                                    <Typography variant="h4">{singleContent.content.title}</Typography>
                                </Stack>
                                <Divider sx={{ my: 2, bgcolor: "#222831" }} />
                                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4}>
                                    <Typography variant="h3">Content Creator</Typography>
                                    <Typography variant="h4">{author.name}</Typography>
                                </Stack>
                                <Divider sx={{ my: 2, bgcolor: "#222831" }} />
                                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4}>
                                    <Typography variant="h3">Duration</Typography>
                                    <Typography variant="h4">{singleContent.content.duration}</Typography>
                                </Stack>
                                <Divider sx={{ my: 2, bgcolor: "#222831" }} />
                                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4}>
                                    <Typography variant="h3">Price</Typography>
                                    <Typography variant="h4">{singleContent.content.price}€</Typography>
                                </Stack>
                                <Divider sx={{ mt: 2, mb: 0, bgcolor: "#222831" }} />
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={4} sx={{ mt: 2, ml: { xs: 3, md: 0 } }}>
                        <Typography variant="h3">Description</Typography>
                        <Typography variant="h4">{singleContent.content.description}</Typography>
                    </Stack>
                    <Divider sx={{ mt: 3, ml: { xs: 3, md: 0 }, bgcolor: "#222831" }} />
                </Stack>
                {show ? null : (
                    <Box alignItems="flex-start" sx={{ width: { xs: "100%", md: "100%", lg: "80%", xl: "60%" } }}>
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
                            <FormControlLabel control={<Radio />} value="payPal" label="PayPal" />
                        </RadioGroup>
                    </Stack>
                )}
                {show ? null : (
                    <Box alignItems="flex-start" sx={{ width: { xs: "100%", md: "100%", lg: "80%", xl: "60%" } }}>
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
                            control={<Checkbox checked={termsChecked} onChange={handleTermsChange} />}
                            label={
                                <Stack direction="row" spacing={0.5}>
                                    <Typography>I have read the</Typography>
                                    <Typography component={RouterLink} target="_blank" color="inherit" to={`/terms-and-conditions`}>
                                        Terms and Conditions{" "}
                                    </Typography>
                                </Stack>
                            }
                        />
                    </Stack>
                )}
                {show ? null : (
                    <HighlightButton variant="contained" type="submit" onClick={handleSubmit}>
                        Buy Now
                    </HighlightButton>
                )}
                {show ? <PaypalCheckoutButton product={singleContent.content} /> : null}
                <Snackbar open={snackopen} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="error" sx={{ width: "100%" }}>
                        You have to accept FitHub's Terms and Conditions before continuing.
                    </Alert>
                </Snackbar>
            </Stack>
        </PayPalScriptProvider>
    );
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, { getContent })(Payment);
