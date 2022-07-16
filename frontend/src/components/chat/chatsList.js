import * as React from 'react';
import List from '@mui/material/List';
import ChatListItem from "./chatListItem";
import {Box, Divider} from "@mui/material";
import UserService from "../../services/userService";

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
            {chats.map((chat) => {
                return (<Box key={chat.partOne}>
                    <ChatListItem name={chat.name} img={chat.img} id={chat.partOne} setActiveChat={setActiveChat}/>
                    <Divider variant="inset" component="li"/>
                </Box>)
            })}
        </List>);
}

export default ChatsList;