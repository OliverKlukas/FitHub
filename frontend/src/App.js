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

/**
 * Consists of a header at top, the different routed views in the middle and a footer at the bottom.
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
                    <Route path="/profile" element={<ProfileViews/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>);
}

export default App;
