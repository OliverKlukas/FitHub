import * as React from "react";
import {Stack} from "@mui/material";
import ChatsList from "../components/chat/chatsList";
import ChatWindow from "../components/chat/chatWindow";

function ChatView(){
    return (
        <Stack direction={"row"}>
            <ChatsList/>
            <ChatWindow/>
        </Stack>
    );
}

export default ChatView;