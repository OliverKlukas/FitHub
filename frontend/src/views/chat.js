import * as React from "react";
import {useEffect, useState} from "react";
import {Box, CircularProgress, Divider, Stack, Typography} from "@mui/material";
import ChatsList from "../components/chat/chatsList";
import ChatWindow from "../components/chat/chatWindow";
import CreatorDrawer from "../components/drawer/creator_drawer";
import {useSelector} from "react-redux";
import CustomerDrawer from "../components/drawer/customer_drawer";
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
    const [activeChat, setActiveChat] = useState(null);

    // Retrieve the chat partners.
    const [chats, setChats] = useState(null);

    // Enable navigation via react router.
    const navigate = useNavigate();

    // Fetches chats from database and collects necessary data for chat view.
    async function fetchChats() {
        await ChatService.getChats().then(async (res) => {
            // Retrieve all relevant chat information via waiting for all promises in map to resolve.
            const newChats = await Promise.all(res.map(async (chat) => {
                const receiverId = chat.partOne === user.user._id ? chat.partTwo : chat.partOne;
                return {
                    receiverId: receiverId,
                    receiverName: await UserService.getUsername(receiverId),
                    messages: chat.messages,
                    receiverImg: await UserService.getUserImg(receiverId),
                };
            }));
            setChats(newChats);
            if (newChats.length > 0 && activeChat === null) {
                setActiveChat(newChats[0].receiverId);
            }
        });
    }

    // Update chats on reload.
    useEffect(() => {
        // Only let singed in user use the chat window.
        if (user.user) {
            // Initially load chat once, after that load it every 3 seconds in order to check for new messages.
            if (!chats) {
                fetchChats();
            } else {
                const interval = setInterval(() => {
                    fetchChats();
                }, 5000);
                return () => clearInterval(interval);
            }
        } else {
            navigate("/discovery");
        }
    }, [user.user, chats]);

    return (<Stack direction="row" marginTop={5} spacing={5}>
            {user.user.role === "customer" ? <CustomerDrawer currTab={"Chat"}/> : <CreatorDrawer currTab="Chat"/>}
            <Divider orientation="vertical" flexItem/>
            {!chats ?
                <Box display="flex" justifyContent="center" alignItems="center" width={"95%"} height={"75vh"}>
                    <CircularProgress/>
                </Box> : <Stack spacing={5} direction={"row"}>
                    <Stack>
                        <Typography variant={"h3"}>
                            {user.user.role === "customer" ? "My Creators" : "My Customers"}
                        </Typography>
                        <Divider sx={{marginTop: 2}} flexItem/>
                        <ChatsList chats={chats} setActiveChat={setActiveChat}/>
                    </Stack>
                    <Divider orientation={"vertical"} flexItem/>
                    {chats.length === 0 ?
                        <Box display="flex" justifyContent="center" alignItems="center" width={"60vw"} height={"75vh"}>
                            <Typography variant={"h4"}> You don't seem to have any chats yet, buy or sell content to
                                start conversations!</Typography>
                        </Box>
                        : <ChatWindow fetchChats={fetchChats} chat={chats.find((chat) => chat.receiverId === activeChat)}/>}
                </Stack>}
        </Stack>
    );
}

export default ChatView;