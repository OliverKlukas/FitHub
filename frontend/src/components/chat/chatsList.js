import * as React from 'react';
import List from '@mui/material/List';
import ChatListItem from "./chatListItem";
import {Box, Divider, Stack, Typography} from "@mui/material";

// TODO: get from backend
const chats = ["Simon Vogl", "Oliver Klukas", "Johannes Loebbecke", "Maximilian Schumergruber", "Simon Vogl", "Oliver Klukas", "Johannes Loebbecke", "Maximilian Schumergruber", "Simon Vogl", "Oliver Klukas", "Johannes Loebbecke", "Maximilian Schumergruber"];

function ChatsList() {
    return (
        <List sx={{
            width: '100%',
            maxWidth: '25vw',
            bgcolor: 'background.paper',
            overflow: 'auto',
            maxHeight: '75vh',
        }}
        >
            {chats.map((item, index) => (
                    <Box key={index}>
                        <ChatListItem name={item} img={"TODO"}/>
                        <Divider variant="inset" component="li"/>
                    </Box>
                )
            )}
        </List>
    );
}

export default ChatsList;