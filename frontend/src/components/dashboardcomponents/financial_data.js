import { Stack, Typography} from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function FinancialData() {

    const CreatorRevenue = "20'000€";

    return (
        <Stack direction="row" spacing={3}>
            <Card sx={{ minWidth: 200 }}>
                <CardContent>
                   <Typography variant="h5" component="div">
                     Revenue
                   </Typography>
                   <Typography variant="h3">
                     {CreatorRevenue}
                   </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 200 }}>
                <CardContent>
                   <Typography variant="h5" component="div">
                     Revenue
                   </Typography>
                   <Typography variant="h3">
                     {CreatorRevenue}
                   </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 200 }}>
                <CardContent>
                   <Typography variant="h5" component="div">
                     Revenue
                   </Typography>
                   <Typography variant="h3">
                     {CreatorRevenue}
                   </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 200 }}>
                <CardContent>
                   <Typography variant="h5" component="div">
                     Revenue
                   </Typography>
                   <Typography variant="h3">
                     {CreatorRevenue}
                   </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}