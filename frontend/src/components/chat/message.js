import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function Message(props) {
    return (<ListItem>
        <ListItemText
            primary={props.text}
        />
    </ListItem>);

}

export default Message;