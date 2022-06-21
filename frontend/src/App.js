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

/**
 * Consists of a header at top, the different routed views in the middle and a footer at the bottom.
 *
 * @returns {JSX.Element}
 */
function App() {
    return (<ThemeProvider theme={FitHubTheme}>
        <CssBaseline/>
        <BrowserRouter>
            <Box sx={{marginX: 6}}>
                <Header gender="male" userType="content-creator"/>
                <Box minHeight="75vh">
                    <Routes>
                        <Route path="*" element={<PageNotFound/>}/>
                        <Route path="/" element={<Discovery/>}/>
                        <Route path="/discovery" element={<Discovery/>}/>
                        <Route path="/upload" element={<AboutUs/>}/>
                        <Route path="/plans" element={<AboutUs/>}/>
                        <Route path="/about" element={<AboutUs/>}/>
                        <Route path="/contact" element={<AboutUs/>}/>
                        <Route path="/profile" element={<ProfileViews/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/details/:id" element={<Details/>}/>
                    </Routes>
                </Box>
                <Footer/>
            </Box>
        </BrowserRouter>
    </ThemeProvider>);
}

export default App;
