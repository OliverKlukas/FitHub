import * as React from "react";
import {Box, CircularProgress, Divider, Stack, Typography} from "@mui/material";
import ChatsList from "../components/chat/chatsList";
import ChatWindow from "../components/chat/chatWindow";
import CreatorDrawer from "../components/drawer/creator_drawer";
import {useSelector} from "react-redux";
import CustomerDrawer from "../components/drawer/customer_drawer";
import {useEffect, useState} from "react";
import ChatService from "../services/chatService";
import UserService from "../services/userService";
import {useNavigate} from "react-router-dom";

/**
 * Implements chat functionality.
 *
 * @return {JSX.Element}
 * @constructor
 */
function ChatView() {

    // Retrieve current logged in user from redux state.
    const user = useSelector((state) => state.user);

    // Hook to set the currently active chat partner.
    const [activeChat, setActiveChat] = useState("");       // TODO

    // Retrieve the chat partners.
    const [chatPartner, setChatPartner] = useState(null);

    // Enable navigation via react router.
    const navigate = useNavigate();

    // Fetches chat partner names.
    async function fetchChats() {
        return await ChatService.getChatPartner();
    }

    // Update chats on reload.
    useEffect(() => {
        // Only let singed in user use the chat window.
        if(user.user){
            if (!chatPartner) {
                fetchChats().then((res) => {
                    setChatPartner([]);
                    Array.from(res).map(async (partnerId) => {
                        // Store all relevant information for chat inside one object.
                        const newChatPartner = {
                            id: partnerId,
                            name: await UserService.getUsername(partnerId),
                            img: await UserService.getUserImg(partnerId),
                            chat: await ChatService.getChat(partnerId)
                        }

                        setChatPartner(chatPartner => [...chatPartner, newChatPartner])
                    })
                    if(chatPartner && chatPartner.length !== 0){
                        setActiveChat(chatPartner[0].id);
                    }
                })
            }
        } else{
            navigate("/discovery");
        }
    })

    return (<Stack direction="row" marginTop={5} spacing={5}>
            {user.user.role === "customer" ? <CustomerDrawer currTab={"Chat"}/> : <CreatorDrawer currTab="Chat"/>}
            <Divider orientation="vertical" flexItem/>
            {!chatPartner ?
                <Box display="flex" justifyContent="center" alignItems="center" width={"95%"} height={"75vh"}>
                    <CircularProgress/>
                </Box> : <Stack spacing={5} direction={"row"}>
                    <Stack>
                        <Typography variant={"h3"}>
                            {user.user.role === "customer" ? "My Creators" : "My Customers"}
                        </Typography>
                        <Divider sx={{marginTop: 2}} flexItem/>
                        <ChatsList chatPartner={chatPartner} setActiveChat={setActiveChat}/>
                    </Stack>
                    <Divider orientation={"vertical"} flexItem/>
                    {chatPartner.length === 0 ?
                        <Box display="flex" justifyContent="center" alignItems="center" width={"60vw"} height={"75vh"}>
                            <Typography variant={"h4"}> You don't seem to have any chats yet, check out the discovery to start conversations!</Typography>
                        </Box>
                        : <ChatWindow name={"Simon Vogl"}/>}
                </Stack>}
        </Stack>
    );
}

export default ChatView;