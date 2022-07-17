import * as React from 'react';
import List from '@mui/material/List';
import ChatListItem from "./chatListItem";
import {Box, Divider} from "@mui/material";

/**
 * Implements list of chat partners the logged in person has.
 *
 * @param chats - List of all chats of current user.
 * @param setActiveChat - Actively selected chat to inspect.
 * @return {JSX.Element}
 * @constructor
 */
function ChatsList({chats, setActiveChat}) {
    return (<List sx={{
            width: '100%', maxWidth: '25vw', bgcolor: 'background.paper', overflow: 'auto', height: '75vh',
        }}
        >
            {chats.map((chat, index) => {
                return (<Box key={chat.receiverId + index}>
                    <ChatListItem name={chat.receiverName} img={chat.receiverImg} id={chat.receiverId} setActiveChat={setActiveChat}/>
                    <Divider variant="inset" component="li"/>
                </Box>)
            })}
        </List>);
}

export default ChatsList;