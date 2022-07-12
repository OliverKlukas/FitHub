import { Stack } from "@mui/material";
import * as React from "react";
import FinancialCard from "./financial_card";

export default function FinancialData() {
  return (
    <Stack direction="row" spacing={3}>
      <FinancialCard cardHeader="Overall Revenue" cardData="20.000 €" />
      <FinancialCard cardHeader="Expected Payout" cardData="200 €" />
      <FinancialCard cardHeader="Payout Growth" cardData="+20 %" />
      <FinancialCard cardHeader="Overall Customers" cardData="100" />
    </Stack>
  );
}
