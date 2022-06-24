import * as React from 'react';
import Discovery from "./views/discovery";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./views/about_us";
import {CssBaseline, ThemeProvider} from "@mui/material";
import FitHubTheme from "./utils/theme";
import {Header} from "./components/header/header";
import ProfileViews from './views/profile_views';
import Box from "@mui/material/Box";
import Footer from "./components/footer/footer";
import Registration from './views/registration';
import Details from "./views/details";
import PageNotFound from "./views/page_not_found";
import Payment from "./views/payment";
import TermsAndConditions from "./views/terms_and_conditions";
import MyPlans from "./views/myplans";
import LandingPage from "./views/landing_page";
import ContentUpload from './views/content_upload'; 
import SignIn from './views/sign_in';

/**
 * Consists of a header at top, the different routed views in the middle and a footer at the bottom.
 *
 * @returns {JSX.Element}
 */
function App() {

    const [signedIn, setSignedIn] = React.useState(false)

    return (<ThemeProvider theme={FitHubTheme}>
        <CssBaseline/>
        <BrowserRouter>
            <Box sx={{marginX: 6}}>
                <Header gender="male" userType="content-creator" signedIn={signedIn}/>
                <Box minHeight="75vh">
                    <Routes>
                        <Route path="*" element={<PageNotFound/>}/>
                        <Route path="/" element={<Discovery/>}/>
                        <Route path="/landing" element={<LandingPage/>}/>
                        <Route path="/discovery" element={<Discovery/>}/>
                        <Route path="/upload" element={<ContentUpload/>}/>
                        <Route path="/plans" element={<AboutUs/>}/>
                        <Route path="/about" element={<AboutUs/>}/>
                        <Route path="/contact" element={<AboutUs/>}/>
                        <Route path="/profile/:id" element={<ProfileViews/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/details/:id" element={<Details/>}/>
                        <Route path="/payment/:id" element={<Payment/>}/>
                        <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
                        <Route path="/myplans/:id" element={<MyPlans/>}/>           
                        <Route path="/signin" element={<SignIn/>}/>      
                    </Routes>
                </Box>
                <Footer/>
            </Box>
        </BrowserRouter>
    </ThemeProvider>);
}

export default App;
