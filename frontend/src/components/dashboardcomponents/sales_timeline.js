import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import boughtPlanService from "../../services/boughtPlanService";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function SalesTimeline() {
  const user = useSelector((state) => state.user);

  const [data, setData] = React.useState({
    timeline: [],
  });

  useEffect(() => {
    async function fetchData() {
      if (user.user) {
        const res = await boughtPlanService.getTimeline(user.user._id);
        const temp = {
          timeline: res.timeline,
        };
        setData(temp);
      }
    }
    fetchData();
  }, [setData]);

  return (
    <Card sx={{ minWidth: 975, backgroundColor: "#F2F2F2" }}>
      <CardContent>
        <Typography sx={{ mb: 2.5 }} variant="h5" component="div">
          Sales over time
        </Typography>
        <LineChart
          key={Math.random()}
          width={940}
          height={250}
          data={data.timeline}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#00ADB5" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
