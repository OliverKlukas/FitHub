import * as React from "react";
import {Stack, TextField} from "@mui/material";
import List from "@mui/material/List";
import Message from "./message";
import SendIcon from '@mui/icons-material/Send';

// TODO get from backend
const messages = ["Hi", "hi", "wie gehts", "lass mal training machen"];

function ChatWindow(){
    return (
        <Stack width={"100%"} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <List sx={{
                width: '100%',
                bgcolor: 'background.paper',
                overflow: 'auto',
                maxHeight: '75vh',
            }}
            >
                {messages.map((item, index) => (
                            <Message key={index} text={item} />
                    )
                )}
            </List>
            <Stack direction={"row"}>
                <TextField id="standard-basic" label="type message here..." variant="standard" />
                <SendIcon/>
            </Stack>
        </Stack>
    );
}

export default ChatWindow;