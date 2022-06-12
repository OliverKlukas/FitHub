import ImageListItem from "@mui/material/ImageListItem";
import {Card, CardActionArea} from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import * as React from "react";

/**
 * Computes dimensions of a single featured content tile based a random variable.
 *
 * Ensures a minimum size of double the size of a normal tile. Inspired by:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 * @returns {(number|number)[]} - Returns [nr. of cols, nr. of rows] a single featured content tile should span.
 */
function getFeatureDim() {
    const cols = Math.floor(Math.random() * (3 - 1) + 1);
    const rows = cols === 1 ? 2 : Math.floor(Math.random() * (3 - 1) + 1);
    return [cols, rows];
}

/**
 * TODO: computes the dimensions of the image dynamically??
 *
 * Copied from: https://mui.com/material-ui/react-image-list/#CustomImageList.js
 *
 * @param image
 * @param width
 * @param height
 * @param rows
 * @param cols
 * @returns {{src: string, srcSet: string}}
 */
function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${
            height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function ImageCard({item}) {

    const dim = item.featured ? getFeatureDim() : [1, 1];
    const imgWidth = 450;
    const imgHeight = 400;

    return (<ImageListItem cols={dim[0]} rows={dim[1]}>
        <Card
            sx={{
                display: "block",
                height: "100%",
                width: "100%",
                borderRadius: '10px', ':hover': {
                    boxShadow: 15,
                }
            }}
        >
            <CardActionArea href="#" sx={{height: "100%"}}>
                <img
                    style={{objectFit: "cover", width: "100%", height: "100%", borderRadius: "10px"}}
                    {...srcset(item.img, imgWidth, imgHeight, dim[1], dim[0])}
                    alt={item.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    sx={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        borderRadius: '10px',
                        '& .MuiImageListItemBar-title':{
                            fontSize: '24px',
                            fontWeight: '700'
                        },
                        '& .MuiImageListItemBar-subtitle': {
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '18px'
                        }
                    }}
                    title={item.title}
                    subtitle={"by " + item.author}
                    position="bottom"
                />
            </CardActionArea>
        </Card>
    </ImageListItem>);
}
