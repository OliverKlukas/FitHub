import * as React from 'react';
import List from '@mui/material/List';
import ChatListItem from "./chatListItem";
import {Box, Divider} from "@mui/material";
import UserService from "../../services/userService";

/**
 * Implements list of chat partners the logged in person has.
 *
 * @param chatPartner - List of all chat partners of current user.
 * @param setActiveChat - Actively selected chat to inspect.
 * @return {JSX.Element}
 * @constructor
 */
function ChatsList({chatPartner, setActiveChat}) {
    return (<List sx={{
            width: '100%', maxWidth: '25vw', bgcolor: 'background.paper', overflow: 'auto', height: '75vh',
        }}
        >
            {chatPartner.map((chatPartner) => {
                return (<Box key={chatPartner.id}>
                    <ChatListItem name={chatPartner.name} img={chatPartner.img} id={chatPartner.id} setActiveChat={setActiveChat}/>
                    <Divider variant="inset" component="li"/>
                </Box>)
            })}
        </List>);
}

export default ChatsList;