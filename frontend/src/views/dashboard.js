import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CreatorDrawer from "../components/drawer/creator_drawer";
import * as React from "react";
import Divider from "@mui/material/Divider";
import FinancialData from "../components/dashboardcomponents/financial_data";
import ChartsData from "../components/dashboardcomponents/charts_data";
import SalesTimeline from "../components/dashboardcomponents/sales_timeline";

export default function Dashboard() {
  return (
    <Stack direction="row" marginTop={5} spacing={5}>
      <CreatorDrawer currTab="Dashboard" />
      <Divider orientation="vertical" flexItem />
      <Stack spacing={4}>
        <FinancialData />
        <ChartsData />
        <SalesTimeline />
      </Stack>
    </Stack>
  );
}
