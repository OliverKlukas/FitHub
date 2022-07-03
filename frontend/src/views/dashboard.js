import { Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import InsightsDrawer from "../components/drawer/insights_drawer";
import * as React from 'react';
import Divider from '@mui/material/Divider';
import FinancialData from "../components/dashboardcomponents/financial_data";




export default function Dashboard() {


  return (
    <Stack direction="row" marginTop={5} spacing={5}>
      <InsightsDrawer currTab="Dashboard" />
      <Divider orientation="vertical" flexItem />
      <Stack spacing={4}>
      <FinancialData/>
      </Stack>
      </Stack>
    );
}