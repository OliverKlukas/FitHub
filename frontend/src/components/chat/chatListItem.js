import ListItem from "@mui/material/ListItem";
import {ListItemButton, Typography} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

/**
 * Implements single item of the chat partners list that includes name and picture.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function ChatListItem(props) {
    return (<ListItem alignItems="flex-start">
        <ListItemButton>
            <ListItemAvatar>
                <Avatar sx={{
                    bgcolor: "secondary.main",
                }} alt={props.name} src={props.img}/>
            </ListItemAvatar>
            <Typography variant={"h4"}>{props.name}</Typography>
        </ListItemButton>
    </ListItem>);
}

export default ChatListItem;