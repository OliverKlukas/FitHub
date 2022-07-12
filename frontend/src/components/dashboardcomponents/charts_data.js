import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UserService from "../../services/userService";
import { connect, useSelector } from "react-redux";
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
  const user = useSelector((state) => state.user);

  const [data, setData] = React.useState({
    gradingDistribution: [
      { name: 1, amount: 0 },
      { name: 2, amount: 0 },
      { name: 4, amount: 0 },
      { name: 4, amount: 0 },
      { name: 5, amount: 0 },
    ],
    avgReviewRating: 0,
  });

  useEffect(() => {
    async function fetchData() {
      if (user.user) {
        const res = await UserService.getAnalytics(user.user._id);
        const temp = {
          gradingDistribution: res.gradingDistribution,
          avgReviewRating: res.avgReviewRating,
        };
        setData(temp);
      }
    }
    fetchData();
  }, [setData]);

  console.log(data);

  const data01 = [
    { name: "Plan A", value: 187 },
    { name: "Plan B", value: 187 },
    { name: "Plan C", value: 187 },
    { name: "Plan D", value: 187 },
    { name: "Plan E", value: 278 },
    { name: "Plan F", value: 189 },
  ];

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
          <BarChart width={425} height={325} data={data.gradingDistribution}>
            <XAxis dataKey="name" fontWeight="bold" fontSize="20" />
            <Tooltip />
            <Bar dataKey="amount" fill="grey" />
          </BarChart>
          <Typography
            sx={{ mb: 2 }}
            variant="body1"
            component="div"
            textAlign="center"
          >
            average rating:{" "}
            {data.avgReviewRating === 0
              ? "no reviews yet"
              : data.avgReviewRating}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
