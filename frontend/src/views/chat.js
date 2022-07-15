import * as React from "react";
import {Divider, Stack} from "@mui/material";
import ChatsList from "../components/chat/chatsList";
import ChatWindow from "../components/chat/chatWindow";
import CreatorDrawer from "../components/drawer/creator_drawer";
import {useSelector} from "react-redux";
import CustomerDrawer from "../components/drawer/customer_drawer";

/**
 * Implements chat and video calling functionality.
 *
 * TODO: add chat with MongoDB and integrate video calls similarly to zoom with a call room like here: https://www.daily.co/blog/building-a-custom-video-chat-app-with-react/
 *
 * @return {JSX.Element}
 * @constructor
 */
function ChatView() {

    // Retrieve current logged in user from redux state.
    const user = useSelector((state) => state.user);

    return (
        <Stack direction="row" marginTop={5} spacing={5}>
            {user.user.role === "customer" ? <CustomerDrawer currTab={"Chat"}/> : <CreatorDrawer currTab="Chat"/>}
            <Stack spacing={1} direction={"row"}>
                <Divider orientation="vertical" flexItem/>
                <ChatsList/>
                <Divider orientation={"vertical"} flexItem/>
                <ChatWindow name={"Simon Vogl"}/>
            </Stack>
        </Stack>

    );
}

export default ChatView;