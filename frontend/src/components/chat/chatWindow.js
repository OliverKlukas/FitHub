import * as React from "react";
import {Stack, TextField} from "@mui/material";
import List from "@mui/material/List";
import Message from "./message";
import SendIcon from '@mui/icons-material/Send';

// TODO get from backend
const messages = [
    {message: "Hi", sender: true},
    {message: "Hi", sender: false},
    {message: "Wie geht's?", sender: true},
    {message: "Gut und dir?", sender: false},
    {message: "Mir auch!", sender: true},
];

function ChatWindow(){
    return (
        <Stack spacing={2} sx={{marginLeft: 2}} width={"100%"} justifyContent={"flex-end"}>
            <List sx={{
                width: '100%',
                bgcolor: 'background.paper',
                overflow: 'auto',
                maxHeight: '75vh',
            }}
            >
                {messages.map((item, index) => (
                            <Message key={index} text={item.message} sender={item.sender} />
                    )
                )}
            </List>
            <Stack alignItems={"center"} width={"100%"} direction={"row"}>
                <TextField fullWidth id="standard-basic" placeholder="type message here..." variant="standard" />
                <SendIcon sx={{marginX: 2}}/>
            </Stack>
        </Stack>
    );
}

export default ChatWindow;