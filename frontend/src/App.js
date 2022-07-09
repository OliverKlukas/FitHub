import * as React from "react";
import Discovery from "./views/discovery";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "./views/about_us";
import { CssBaseline, ThemeProvider } from "@mui/material";
import FitHubTheme from "./utils/theme";
import Header from "./components/header/header";
import Profile from "./views/profile";
import Box from "@mui/material/Box";
import Footer from "./components/footer/footer";
import SignUp from "./views/sign_up";
import Details from "./views/details";
import PageNotFound from "./views/page_not_found";
import Payment from "./views/payment";
import TermsAndConditions from "./views/terms_and_conditions";
import MyPlans from "./views/myplans";
import LandingPage from "./views/landing_page";
import ContentUpload from "./views/content_upload";
import SignIn from "./views/sign_in";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "./redux/reducers";
import thunkMiddleware from "redux-thunk";
import MyContent from "./views/mycontent";
import Dashboard from "./views/dashboard";
import CustomerOverview from "./views/customer_overview";
import { useState } from "react";
import Sign_up from "./views/sign_up";

/**
 * Consists of a header at top, the different routed views in the middle and a footer at the bottom.
 *
 * @return {JSX.Element}
 */
function App() {
  // create store for redux
  const store = createStore(reducers, applyMiddleware(thunkMiddleware));

  const [choice, setChoice] = useState("");

  return (
    <ThemeProvider theme={FitHubTheme}>
      <Provider store={store}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ marginX: 6 }}>
            <Header gender="male" userType="content-creator" />
            <Box minHeight="75vh">
              <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route
                  path="/"
                  element={<Navigate to="/discovery" replace />}
                />
                <Route
                  path="/landing"
                  element={<LandingPage data={{ setChoice }} />}
                />
                <Route path="/discovery" element={<Discovery />} />
                <Route path="/upload" element={<ContentUpload />} />
                <Route path="/plans" element={<MyPlans />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<AboutUs />} />
                <Route
                  path="/profile/:firstName/:lastName"
                  element={<Profile />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/payment/:id" element={<Payment />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/mycontent/:id" element={<MyContent />} />
                <Route path="/dashboard/:id" element={<Dashboard />} />
                <Route path="/mycustomers/:id" element={<CustomerOverview />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
