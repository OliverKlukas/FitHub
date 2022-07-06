import ImageListItem from "@mui/material/ImageListItem";
import { Card, CardActionArea } from "@mui/material";
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
 * @return {{src: string, srcSet: string}} - Returns dictionary with src and srcSet variables for img.
 */
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

let reflink = "";
/**
 * 
 * @param {*} item - List with Image link, title name, etc
 * @param {*} iheight - height for img -> difference Header Image & Tiles 
 * @param {*} iwidth - width for img -> difference Header Image & Tiles 
 * @param {*} ilink - href link
 * @param {*} isHeader - header has other fonts sizes for text (default true)
 * @returns - image with included text 
 */
export default function ImageCard({item, iheight, iwidth, ilink, isHeader=true}) {

    if(isHeader){
         reflink = ilink; //TOFO: add profile id 
    }else{
         reflink = ilink + "/" + item.option;
    }
    return (
        <CardActionArea href={reflink} sx={{height: "100%"}}>
            <img
                    style={{objectFit: "cover", width: "100%", height: "100%", borderRadius: "10px"}}
                    {...srcset(item.img, iwidth, iheight)}
                    alt={item.title}
                    loading="lazy"
            />
            { isHeader ? (
            <ImageListItemBar
                sx={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    borderRadius: '10px',
                    '& .MuiImageListItemBar-title': {
                        fontSize: '50px', lineHeight: '60px', fontWeight: '700'
                    },
                    '& .MuiImageListItemBar-subtitle': {
                        fontSize: '18px', fontWeight: '600', lineHeight: '22px'
                    }
                    }}
                title={item.title} 
                subtitle={item.subtitle}
                />
                ):(
                    <ImageListItemBar
                    sx={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        borderRadius: '10px',
                        '& .MuiImageListItemBar-title': {
                            fontSize: '32px', lineHeight: '36px', fontWeight: '700'
                        }
                    }}
                    title={item.title}
                    position="bottom"
                    />
                ) }
        </CardActionArea>
    )
    }
