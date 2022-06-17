import * as React from 'react';
import Discovery from "./views/discovery";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./views/about_us";
import {CssBaseline, ThemeProvider} from "@mui/material";
import FitHubTheme from "./utils/theme";
import {Header} from "./components/header/header";
<<<<<<< HEAD
import ProfileViews from './views/profile_views';
=======
import Box from "@mui/material/Box";
import Footer from "./components/footer/footer";
>>>>>>> main

/**
 * Consists of a header at top, the different routed views in the middle and a footer at the bottom.
 *
 * TODO: replace all the <AboutUs/> references below with the dedicated pages.
 *
 * @returns {JSX.Element}
 */
function App() {
    return (<ThemeProvider theme={FitHubTheme}>
<<<<<<< HEAD
            <CssBaseline/>
            <BrowserRouter>
                <div>
                    <Header gender="male" user_type="content-creator"/>
                </div>
                <Routes>
                    <Route path="/" element={<Discovery/>}/>
                    <Route path="/discovery" element={<Discovery/>}/>
                    <Route path="/upload" element={<AboutUs/>}/>
                    <Route path="/plans" element={<AboutUs/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/contact" element={<AboutUs/>}/>
                    <Route path="/profile" element={<ProfileViews/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>);
=======
        <CssBaseline/>
        <BrowserRouter>
            <Box sx={{marginX: 6}}>
                <Header gender="male" userType="content-creator"/>
                <Box minHeight="75vh">
                    <Routes>
                        <Route path="/" element={<Discovery/>}/>
                        <Route path="/discovery" element={<Discovery/>}/>
                        <Route path="/upload" element={<AboutUs/>}/>
                        <Route path="/plans" element={<AboutUs/>}/>
                        <Route path="/about" element={<AboutUs/>}/>
                        <Route path="/contact" element={<AboutUs/>}/>
                        <Route path="/profile" element={<AboutUs/>}/>
                    </Routes>
                </Box>
                <Footer/>
            </Box>
        </BrowserRouter>
    </ThemeProvider>);
>>>>>>> main
}

export default App;
