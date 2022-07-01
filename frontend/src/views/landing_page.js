import * as React from 'react';
import {Stack} from "@mui/material";
import LandingImage from "../components/cards/image_landingpage";




const content = [{
    option: "training",
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    title: 'Training Plan'
},  {
    option: "nutrition",
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    title: 'Nutrition Plan'
}, {
    option: "coaching",
    img: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74',
    title: 'Coaching'
}];

const header = {
    img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77',
    title: 'Welcome to FitHub, Emlyn Shaina!',
    subtitle: 'Lets get started, offer your content right away'
};

function LandingPage(){

    return(<Stack item sx={{marginX: 6}} spacing={1}>

        <LandingImage ilink="/profile" iwidth={950} iheight={200} item={header}/>
        <Stack item direction="row" spacing={1}>
        <LandingImage ilink='/upload' iwidth={350} iheight={400} item={content[0]} isHeader={false}/>
        <LandingImage ilink='/upload' iwidth={350} iheight={400} item={content[1]} isHeader={false}/>
        <LandingImage ilink='/upload' iwidth={350} iheight={400} item={content[2]} isHeader={false}/>
        </Stack>
        </Stack>
    )
}

export default LandingPage;