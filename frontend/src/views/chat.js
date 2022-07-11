import * as React from "react";
import {Divider, Stack} from "@mui/material";
import ChatsList from "../components/chat/chatsList";
import ChatWindow from "../components/chat/chatWindow";

/**
 * Implements chat and video calling functionality.
 *
 * TODO: add chat with MongoDB and integrate video calls similarly to zoom with a call room like here: https://www.daily.co/blog/building-a-custom-video-chat-app-with-react/
 *
 * @return {JSX.Element}
 * @constructor
 */
function ChatView() {
    return (
        <Stack spacing={1} direction={"row"}>
            <ChatsList/>
            <Divider orientation={"vertical"} flexItem/>
            <ChatWindow name={"Simon Vogl"}/>
        </Stack>
    );
}

export default ChatView;