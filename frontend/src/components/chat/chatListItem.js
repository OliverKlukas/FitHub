import ListItem from "@mui/material/ListItem";
import {ListItemButton} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

function ChatListItem(props) {
    return (<ListItem alignItems="flex-start">
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar alt={props.name} src={props.img}/>
                </ListItemAvatar>
                <ListItemText
                    primary={props.name}
                />
            </ListItemButton>
        </ListItem>);
}

export default ChatListItem;