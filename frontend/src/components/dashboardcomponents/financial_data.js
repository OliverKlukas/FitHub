import FinancialCard from "./financial_card";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import boughtPlanService from "../../services/boughtPlanService";
import { useSelector } from "react-redux";

export default function FinancialData() {
  const user = useSelector((state) => state.user);

  const [data, setData] = React.useState({
    overallRevenue: 0,
    expectedPayout: 0,
    payoutChange: 0,
    overallCustomers: 0,
  });

  useEffect(() => {
    async function fetchData() {
      if (user.user) {
        const res = await boughtPlanService.getFinancials(user.user._id);
        const temp = {
          overallRevenue: res.overallRevenue,
          expectedPayout: res.expectedPayout,
          payoutChange: res.payoutChange,
          overallCustomers: res.overallCustomers,
        };
        setData(temp);
      }
    }
    fetchData();
  }, [setData]);

  return (
    <Stack direction="row" spacing={3}>
      <FinancialCard
        cardHeader="Overall Revenue"
        cardData={data.overallRevenue + " €"}
      />
      <FinancialCard
        cardHeader="Expected Payout"
        cardData={data.expectedPayout + " €"}
      />
      <FinancialCard
        cardHeader="Payout Change"
        cardData={data.payoutChange + " %"}
      />
      <FinancialCard
        cardHeader="Overall Customers"
        cardData={data.overallCustomers}
      />
    </Stack>
  );
}
