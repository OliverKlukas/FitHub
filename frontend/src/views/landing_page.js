import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import HeaderCard from "../components/cards/header_image";
import SectionCard from "../components/cards/section_image";
import {Stack, useMediaQuery} from "@mui/material";
import theme from "../utils/theme";




const content = [{
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    title: 'Training Plans'
},  {
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    title: 'Nutrition Plan'
}, {
    img: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74',
    title: 'Coaching'
}];

const header = {
    img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77',
    title: 'Welcome to FitHub, Emlyn Shaina!',
    subtitle: 'Lets get started, offer your content right away'
};





function LandingPage(){
    const smallScreenSize = useMediaQuery(theme.breakpoints.down('sm'));
    return(<Stack sx={{marginX: 6}}>
        
        <ImageList
        sx={{
            // Promotes image list into its own layer in Chrome, costs memory, but helps keeping high FPS.
            transform: 'translateZ(0)', overflow: 'hidden'
        }}
        cols={smallScreenSize ? 1 : 1}
        gap={30}
        >
          <HeaderCard item={header} key={header.img}/>
        </ImageList>
        <ImageList
        sx={{
            // Promotes image list into its own layer in Chrome, costs memory, but helps keeping high FPS.
            transform: 'translateZ(0)', overflow: 'hidden'
        }}
        cols={smallScreenSize ? 1 : 3}
        gap={30}
        >
            {content.map((item) => {
                
                return <SectionCard item={item} key={item.img}/>
                
            })}

        

        </ImageList>
        </Stack>
    )
}

export default LandingPage;