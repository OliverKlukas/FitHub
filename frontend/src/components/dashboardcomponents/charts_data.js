import { Stack, Typography } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  PieChart,
  Pie,
} from "recharts";

export default function ChartsData() {
  const data = [
    { name: 1, Amount: 1, Plan2: 2, Plan3: 3, avg: 2 },
    { name: 2, Amount: 4, Plan2: 3, Plan3: 6, avg: 2 },
    { name: 3, Amount: 3, Plan2: 7, Plan3: 8, avg: 2 },
    { name: 4, Amount: 5, Plan2: 5, Plan3: 6, avg: 2 },
    { name: 5, Amount: 2, Plan2: 6, Plan3: 8, avg: 2 },
  ];

  const data01 = [
    { name: "Plan A", value: 187 },
    { name: "Plan B", value: 187 },
    { name: "Plan C", value: 187 },
    { name: "Plan D", value: 187 },
    { name: "Plan E", value: 278 },
    { name: "Plan F", value: 189 },
  ];

  let avgRating = 0;
  let sumRating = 0;
  let amountRating = 0;
  for (const item of data) {
    amountRating += item["Amount"];
    sumRating += item["Amount"] * item["name"];
  }
  avgRating = sumRating / amountRating;
  return (
    <Stack direction="row" spacing={3}>
      <Card sx={{ minWidth: 475, height: 450, backgroundColor: "#F2F2F2" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Sales Distribution
          </Typography>
          <PieChart width={440} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data01}
              innerRadius={50}
              outerRadius={120}
              fill="green"
              label
            />
            <Tooltip />
          </PieChart>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 475, height: 450, backgroundColor: "#F2F2F2" }}>
        <CardContent>
          <Typography sx={{ mb: 0.5 }} variant="h5" component="div">
            Review Development
          </Typography>
          <Typography sx={{ mb: 2 }} variant="body1" component="div">
            past 90 days
          </Typography>
          <BarChart width={425} height={325} data={data}>
            <XAxis dataKey="name" fontWeight="bold" fontSize="20" />
            <Tooltip />
            <Bar dataKey="Amount" fill="grey" />
          </BarChart>
          <Typography
            sx={{ mb: 2 }}
            variant="body1"
            component="div"
            textAlign="center"
          >
            average rating: {avgRating === 0 ? "no reviews yet" : avgRating}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
