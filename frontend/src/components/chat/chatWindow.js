import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Box, Divider, Stack, TextField, Typography} from "@mui/material";
import List from "@mui/material/List";
import Message from "./message";
import SendIcon from '@mui/icons-material/Send';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChatService from "../../services/chatService";

/**
 * Implements the chat window with all messages between two partners, the message input and video call feature.
 *
 * @param chat - Current chat that was selected.
 * @param fetchChats - Function to update chat function on change.
 * @return {JSX.Element}
 * @constructor
 */
function ChatWindow({chat, fetchChats}) {
    const [newMessage, setNewMessage] = useState("");

    // Scroll reference to ensure that the window is scrolled down whenever adding/receiving a new message.
    const scrollRef = useRef(null);
    useEffect(() => {
        if(scrollRef.current){
            scrollRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [chat]);

    // Triggered on enter in text field or on send button press.
    async function sendMessage() {
        if (newMessage !== "") {
            ChatService.updateChat(chat.receiverId, newMessage);
            fetchChats();
            setNewMessage("");
        }
    }

    return (
        <Stack justifyContent={"space-between"} sx={{height: "75vh", width: "65vw"}}>
            <Box>
                <Box alignItems={"center"} display={"flex"} flexDirection={"row"}>
                    <Avatar sx={{
                        bgcolor: "secondary.main",
                        marginLeft: 1.5,
                        marginRight: 2,
                        marginY: 1,
                    }} alt={chat.receiverName} src={chat.receiverImg}/>
                    <Typography variant={"h3"}>
                        {chat.receiverName}
                    </Typography>
                </Box>
                <Divider flexItem/>
            </Box>
            <Stack sx={{
                marginLeft: 2,
            }} width={"100%"} justifyContent={"flex-end"}>
                <List sx={{
                    width: "100%", bgcolor: "background.paper", overflow: "auto", maxHeight: "70vh"
                }}
                >
                    {chat.messages.map((msg, index) => {
                        if(index === (chat.messages.length-1)){
                            return <Message reference={scrollRef} key={index} text={msg.text} sender={msg.senderId !== chat.receiverId}/>;
                        } else {
                            return <Message key={index} text={msg.text} sender={msg.senderId !== chat.receiverId}/>;
                        }
                    })}
                </List>
                <Stack alignItems={"center"} width={"100%"} direction={"row"}>
                    <TextField onKeyDown={(event) => event.key === "Enter" && sendMessage()} value={newMessage}
                               onChange={(event) => setNewMessage(event.target.value)} fullWidth
                               placeholder="type message here..." variant="standard"/>
                    <IconButton onClick={sendMessage} color={"secondary"} sx={{marginX: 2}}>
                        <SendIcon/>
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>

    );
}

export default ChatWindow;