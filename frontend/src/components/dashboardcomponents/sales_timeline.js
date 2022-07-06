import {Typography} from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';



export default function SalesTimeline() {

    const data = [
        {
          name: 'CW 1',
          Sales: 4000
        },
        {
          name: 'CW 2',
          Sales: 3000
        },
        {
          name: 'CW 3',
          Sales: 2000
        },
        {
          name: 'CW 4',
          Sales: 2780
        },
        {
          name: 'CW 5',
          Sales: 1890
        },
        {
          name: 'CW 6',
          Sales: 2390
        },
        {
          name: 'CW 7',
          Sales: 3490
        },
      ];

    return (
        <Card sx={{ minWidth: 975, backgroundColor: '#F2F2F2'}}>
            <CardContent>
                <Typography sx={{ mb: 2.5 }} variant="h5" component="div">
                    Sales over time
                </Typography>
                <LineChart width={940} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
                </LineChart>
            </CardContent>
        </Card>
    );
}