import {Link, Stack, Typography} from "@mui/material";

export default function Footer() {
    return (<Stack direction="row" marginY={5} justifyContent="space-between">
            <Link color="#393E46" fontWeight={300} underline="none" href="/terms-and-conditions"> Terms &
                Conditions</Link>
            <Typography color="#393E46" fontWeight={300}>
                Designed using resources from <Link color="inherit" underline="none"
                                                    href="https://www.flaticon.com">flaticon.com</Link> and <Link
                color="inherit" underline="none" href="https://www.unsplash.com">unsplash.com</Link>
            </Typography>
            <Link color="#393E46" fontWeight={300} underline="none" href="/about"> About us</Link>
        </Stack>);
}