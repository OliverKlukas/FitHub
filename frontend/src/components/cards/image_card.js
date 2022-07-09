import ImageListItem from "@mui/material/ImageListItem";
import {Card, CardActionArea} from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import * as React from "react";
import {useEffect, useState} from "react";
import UserService from "../../services/userService";

/**
 * Single content card component including an interactive action area.
 *
 * @param item - To be displayed content item, expected to adhere to the database scheme of content.
 * @return {JSX.Element} - Returns ImageListItem.
 */
export default function ImageCard({item}) {
    const dim = item.featured ? [1, 2] : [1, 1];
    const [author, setAuthor] = useState("");

    useEffect( () => {
        async function fetchUsername() {
            return await UserService.getUsername(item.ownerId);
        }
        fetchUsername().then(function (res) {
            setAuthor(res);
        })
    }, [item.ownerId])

    return (
        <ImageListItem cols={dim[0]} rows={dim[1]}>
            <Card
                sx={{
                    display: "block",
                    height: "100%",
                    width: "100%",
                    borderRadius: "10px",
                    ":hover": {
                        boxShadow: 15,
                    },
                }}
            >
                <CardActionArea href={`/details/${item._id}`} sx={{height: "100%"}}>
                    <img
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: dim[1] === 1 ? "35vh" : "70vh",
                            borderRadius: "10px",
                        }}
                        src={item.media[0]}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        sx={{
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
                                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                            borderRadius: "10px",
                            "& .MuiImageListItemBar-title": {
                                fontSize: "32px",
                                lineHeight: "36px",
                                fontWeight: "700",
                            },
                            "& .MuiImageListItemBar-subtitle": {
                                fontSize: "18px",
                                fontWeight: "500",
                                lineHeight: "22px",
                            },
                        }}
                        title={item.title}
                        subtitle={"by " + author}
                        position="bottom"
                    />
                </CardActionArea>
            </Card>
        </ImageListItem>
    );
}