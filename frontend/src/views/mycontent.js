import { Stack, Typography } from "@mui/material";
import OffContent from "../components/plans/offcontent";
import CreatorDrawer from "../components/drawer/creator_drawer";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import contentService from "../services/contentService";
import { useSelector } from "react-redux";

export default function MyContent() {
  const user = useSelector((state) => state.user);

  const [data, setData] = React.useState({
    ownContent: [],
  });

  useEffect(() => {
    async function fetchData() {
      if (user.user) {
        const res = await contentService.getMyContent(user.user._id);
        const temp = {
          ownContent: res.ownContent,
        };
        setData(temp);
      }
    }
    fetchData();
  }, [user.user]);

  const dateFromObjectId = function (objectId) {
    const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    return date;
  };

  return (
    <Stack direction="row" marginTop={5} spacing={5}>
      <CreatorDrawer currTab="Content"></CreatorDrawer>
      <Divider orientation="vertical" flexItem />
      <Stack spacing={4}>
        <Typography variant="h1">My Content</Typography>
        {data.ownContent
          .sort((a, b) =>
            dateFromObjectId(a._id) > dateFromObjectId(b._id)
              ? -1
              : dateFromObjectId(b._id) > dateFromObjectId(a._id)
              ? 1
              : 0
          )
          .map((item) => {
            return <OffContent key={item._id} item={item}></OffContent>;
          })}
      </Stack>
    </Stack>
  );
}
