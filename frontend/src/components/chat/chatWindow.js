import * as React from "react";
import {Box, Divider, Stack, TextField, Typography} from "@mui/material";
import List from "@mui/material/List";
import Message from "./message";
import SendIcon from '@mui/icons-material/Send';
import Avatar from "@mui/material/Avatar";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import IconButton from "@mui/material/IconButton";

// TODO get from backend, might even put this into chat.js
const messages = [{
    message: "Hi, it's great to see that you bought my content! How do you like it?",
    sender: true
}, {message: "Hi, I enjoyed it very much so far! ", sender: false}, {
    message: "I do have a question though! Could you explain to me what the best technique for the bench press exercises would look like?",
    sender: false
}, {message: "Sure thing! First of all, you need to pay attention...", sender: true}];

/**
 * Implements the chat window with all messages between two partners, the message input and video call feature.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function ChatWindow(props) {
    return (
        <Stack justifyContent={"space-between"} sx={{height: "75vh", width: "100%"}}>
            <Box>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Box alignItems={"center"} display={"flex"} flexDirection={"row"}>
                        <Avatar sx={{
                            bgcolor: "secondary.main",
                            marginLeft: 1.5,
                            marginRight: 2,
                            marginY: 1,
                        }} alt={props.name} src={props.img}/>
                        <Typography variant={"h3"}>
                            {props.name}
                        </Typography>
                    </Box>
                    <IconButton color={"secondary"}>
                        <VideoCallIcon fontSize={"large"}/>
                    </IconButton>
                </Stack>
                <Divider flexItem/>
            </Box>
            <Stack sx={{
                marginLeft: 2,
            }} width={"100%"} justifyContent={"flex-end"}>
                <List sx={{
                    width: "100%", bgcolor: "background.paper", overflow: "auto",
                }}
                >
                    {messages.map((item, index) => (<Message key={index} text={item.message} sender={item.sender}/>))}
                </List>
                <Stack alignItems={"center"} width={"100%"} direction={"row"}>
                    <TextField fullWidth id="standard-basic" placeholder="type message here..." variant="standard"/>
                    <IconButton color={"secondary"} sx={{marginX: 2}}>
                        <SendIcon/>
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>

    );
}

export default ChatWindow;