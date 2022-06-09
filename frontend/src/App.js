import * as React from 'react';
import {Header} from "./components/header/header";
import Discovery from "./views/discovery";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AboutUs from "./views/about_us";
import './App.css';

function App() {
    return (<BrowserRouter>
            <div>
                <Header/>
            </div>
            <Routes>
                <Route path="/" element={<Discovery/>}/>
                <Route path="/discovery" element={<Discovery/>}/>
                <Route path="/upload" element={<AboutUs/>}/>
                <Route path="/plans" element={<AboutUs/>}/>
                <Route path="/about" element={<AboutUs/>}/>
                <Route path="/contact" element={<AboutUs/>}/>
                <Route path="/profile" element={<AboutUs/>}/>
            </Routes>
        </BrowserRouter>);
}

export default App;
