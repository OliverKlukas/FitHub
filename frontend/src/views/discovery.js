import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${
            height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: '12-Weeks Full-Body Workout',
        author: 'Igor Felchin',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Crossfit Workout Routine',
        author: 'Osanna Imbi',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Weight Loss Nutrition Plan',
        author: 'Calixta Tadeusz',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: '9-Weeks Cardio Plan',
        author: 'Emlyn Shaina',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Vegan Nutrition Plan',
        author: 'Ernesta Lunete',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Powerlifting Coaching',
        author: 'Arnold Schwarzenegger',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Home Workout Routines',
        author: 'Konsuke Hardmod',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Personal Weightlifting Coaching',
        author: 'Katie Wassmann',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Pescatarian Weight Loss Plan',
        author: 'Shelly Purdue',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Professional Running Analysis',
        author: 'Herfeld Roman',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: '12-Weeks Weight Loss Plan',
        author: 'Simon Plashek',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Lower Body Training Plan',
        author: 'Susanne Friedrisch',
    },
];

/*const useStyles = makeStyles({
    a: {
        display: 'block',
        height: '100%',
    },
    img: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    },
});*/

function Discovery(){
    return(
        <ImageList
            sx={{
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)',
                marginX: 6,
                overflow: 'hidden',
                title: {
                    fontSize: '2rem',
                }
            }}
            rowHeight={400}
            cols={3}
            variant="quilted"
            gap='2vw'
        >
            {itemData.map((item) => {
                const cols = item.featured ? 1 : 1;
                const rows = item.featured ? 2 : 1;

                return (
                    <ImageListItem key={item.img} cols={cols} rows={rows}>
                        <a style={{display: "block", height: "100%"}} href="#">
                            <img
                                style={{objectFit: "cover", width: "100%", height: "100%", borderRadius: "10px"}}
                                {...srcset(item.img, 250, 200, rows, cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    borderRadius: '10px',
                                }}
                                title={item.title}
                                subtitle={"by " + item.author}
                                position="bottom"
                            />
                        </a>
                    </ImageListItem>
                );
            })}
        </ImageList>
    )
}

export default Discovery;