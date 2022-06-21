import ImageListItem from "@mui/material/ImageListItem";
import {Card, CardActionArea} from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import * as React from "react";

/**
 * Computes image size for optimal display in ImageList grid.
 *
 * Copied from: https://mui.com/material-ui/react-image-list/#CustomImageList.js
 *
 * @param image - String path to image resource.
 * @param width - Number desired width of image.
 * @param height - Number desired height of image.
 * @param rows - Number of rows the image should stretch.
 * @param cols - Number of columns the image should stretch.
 * @returns {{src: string, srcSet: string}} - Returns dictionary with src and srcSet variables for img.
 */
function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
}

/**
 * Single content card component including an interactive action area.
 *
 * @param item - To be displayed content item, expected to adhere to the database scheme of content.
 * @returns {JSX.Element} - Returns ImageListItem.
 */
export default function ImageCard({item}) {
    const dim = item.featured ? [1, 2] : [1, 1];
    const imgWidth = 450;
    const imgHeight = 400;

    return (<ImageListItem cols={dim[0]} rows={dim[1]}>
        <Card
            sx={{
                display: "block", height: "100%", width: "100%", borderRadius: '10px', ':hover': {
                    boxShadow: 15,
                }
            }}
        >
            <CardActionArea href={`/details/${item.id}`} sx={{height: "100%"}}>
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
                        '& .MuiImageListItemBar-title': {
                            fontSize: '32px', lineHeight: '36px', fontWeight: '700'
                        },
                        '& .MuiImageListItemBar-subtitle': {
                            fontSize: '18px', fontWeight: '500', lineHeight: '22px'
                        }
                    }}
                    title={item.title}
<<<<<<< HEAD
                    subtitle={"by " + item.author} // Add Link to Content Creator?
=======
                    subtitle={"by " + item.author.name}
>>>>>>> main
                    position="bottom"
                />
            </CardActionArea>
        </Card>
    </ImageListItem>);
}
