import ListItem from "@mui/material/ListItem";
import {ListItemButton, Typography} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

/**
 * Implements single item of the chat partners list that includes name and picture.
 *
 * @param name - Name of chat partner.
 * @param img - Image of chat partner.
 * @param id - Id of chat partner.
 * @param setActiveChat - Hook that sets the selected chat partner.
 * @return {JSX.Element}
 * @constructor
 */
function ChatListItem({name, img, id, setActiveChat}) {
    return (<ListItem alignItems="flex-start" sx={{
        "&.MuiListItem-root":{
            paddingX: 0,
        }
    }}>
        <ListItemButton onClick={() => setActiveChat(id)}>
            <ListItemAvatar>
                <Avatar sx={{
                    bgcolor: "secondary.main",
                }} alt={name} src={img}/>
            </ListItemAvatar>
            <Typography variant={"h4"}>{name}</Typography>
        </ListItemButton>
    </ListItem>);
}

export default ChatListItem;