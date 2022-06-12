import * as React from 'react';
import Discovery from "./views/discovery";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AboutUs from "./views/about_us";
import ContentCreatorProfile from './views/content_creator_profile';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import FitHubTheme from "./utils/theme";
import {Header} from "./components/header/header";

/**
 * Supplies FitHub's general structure with a header at top and different routed views below.
 *
 * TODO: replace all the <AboutUs/> references below with the dedicated pages.
 *
 * @returns {JSX.Element}
 */
function App() {
    return (<ThemeProvider theme={FitHubTheme}>
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
                    <Route path="/profile" element={<AboutUs/>}/>
                    <Route path="/ContentCreator" element={<ContentCreatorProfile/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>);
}

export default App;
