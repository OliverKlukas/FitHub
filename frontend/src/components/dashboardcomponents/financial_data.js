import {Stack} from "@mui/material";
import * as React from 'react';
import FinancialCard from "./financial_card";


export default function FinancialData() {


    return (
        <Stack direction="row" spacing={3}>
          <FinancialCard cardHeader="Revenue" cardData="20.000 €" />
          <FinancialCard cardHeader="Revenue" cardData="20.000 €" />
          <FinancialCard cardHeader="Revenue" cardData="20.000 €" />
          <FinancialCard cardHeader="Revenue" cardData="20.000 €" />
        </Stack>
    );
}