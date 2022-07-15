import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { creator } from "../utils/creator";
import { content } from "../utils/content";
import OffContent from "../components/plans/offcontent";
import CreatorDrawer from "../components/drawer/creator_drawer";
import * as React from "react";
import Divider from "@mui/material/Divider";

export default function MyContent() {
  // Match url id to consumer item.

  const id = 3000;
  const item = creator.find((item) => item.id === id);

  return (
    <Stack direction="row" marginTop={5} spacing={5}>
      <CreatorDrawer currTab="Content"></CreatorDrawer>
      <Divider orientation="vertical" flexItem />
      <Stack spacing={4}>
        <Typography variant="h1">My Plans</Typography>
        {/* eslint-disable-next-line */}
        {content.map((con) => {
          if (item.offeredContent.includes(con.id)) {
            return <OffContent item={con} key={con.img} />;
          }
        })}
      </Stack>
    </Stack>
  );
}
