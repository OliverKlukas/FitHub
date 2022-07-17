import * as React from "react";
import ListItem from "@mui/material/ListItem";
import {Box, Typography} from "@mui/material";

/**
 * Implements message in chat with differentiation between sender and receiver.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function Message(props) {
    return (<ListItem ref={props.reference && props.reference}
        sx={{
            "&.MuiListItem-root": {
                justifyContent: props.sender ? "flex-end" : "flex-start",
                maxWidth: "65vw",
            }
        }}
    >
        <Box sx={{
            maxWidth: "100%",
            backgroundColor: props.sender ? "secondary.main" : "warning.main",
            borderRadius: 5,
            borderTopRightRadius: props.sender && 0,
            borderTopLeftRadius: !props.sender && 0,
            paddingX: 2,
            paddingY: 1,
        }}>
            <Typography sx={{ wordWrap: "break-word"}} color={"#ffffff"}>{props.text}</Typography>
        </Box>
    </ListItem>);

}

export default Message;