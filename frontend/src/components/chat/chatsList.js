import * as React from 'react';
import List from '@mui/material/List';
import ChatListItem from "./chatListItem";
import {Box, Divider} from "@mui/material";

// TODO: get from backend, might even put this into chat.js
const chats = ["Simon Vogl", "Oliver Klukas", "Johannes Loebbecke", "Maximilian Schumergruber"];

/**
 * Implements list of chat partners the logged in person has.
 *
 * @return {JSX.Element}
 * @constructor
 */
function ChatsList() {
    return (
        <List sx={{
            width: '100%',
            maxWidth: '25vw',
            bgcolor: 'background.paper',
            overflow: 'auto',
            height: '75vh',
        }}
        >
            {chats.map((item, index) => (
                    <Box key={index}>
                        <ChatListItem name={item} img={item}/>
                        <Divider variant="inset" component="li"/>
                    </Box>
                )
            )}
        </List>
    );
}

export default ChatsList;