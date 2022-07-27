import { Typography } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

/**
 *
 * @param cardHeader - big text in each box
 * @param cardData - data itself
 * @returns
 */
export default function FinancialCard({ cardHeader, cardData }) {
  return (
    <Card sx={{ minWidth: 225, backgroundColor: "#F2F2F2" }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          {cardHeader}
        </Typography>
        <Typography variant="h3">{cardData}</Typography>
      </CardContent>
    </Card>
  );
}
