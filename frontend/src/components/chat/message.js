import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Box} from "@mui/material";

function Message(props) {
    return (<ListItem
        sx={{
            marginY: 0.5,
            textAlign: props.sender ? "right" : "left",
    }}
    >
            <ListItemText
                sx={{
                    "&.MuiListItemText-root":{
                        color: "#FFFFFF"
                    },
                    width: "10px",
                    backgroundColor: props.sender ? "primary.main" : "warning.main",
                    borderRadius: 5,
                }}
                primary={props.text}
            />
    </ListItem>);

}

export default Message;