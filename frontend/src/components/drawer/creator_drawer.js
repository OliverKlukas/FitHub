import * as React from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export default function CreatorDrawer({ currTab }) {
  let DashboardFontWeight = "normal";
  let ContentFontWeight = "normal";
  let UploadFontWeight = "normal";
  let ChatFontWeight = "normal";

  if (currTab === "Dashboard") {
    DashboardFontWeight = "bold";
  } else if (currTab === "Content") {
    ContentFontWeight = "bold";
  } else if (currTab === "Upload") {
    UploadFontWeight = "bold";
  } else if (currTab === "Chat") {
    ChatFontWeight = "bold";
  }

  return (
    <Stack spacing={1} minWidth={"5vw"} maxWidth={"15vw"} minHeight={"75vh"}>
      <Link
        underline="hover"
        variant="subtitle1"
        fontWeight={DashboardFontWeight}
        href="/dashboard"
      >
        Dashboard
      </Link>
      <Divider />
      <Link
        variant="subtitle1"
        underline="hover"
        fontWeight={ContentFontWeight}
        href="/mycontent"
      >
        Content
      </Link>
      <Divider />
      <Link
        variant="subtitle1"
        underline="hover"
        fontWeight={UploadFontWeight}
        href="/upload"
      >
        Upload
      </Link>
      <Divider />
      <Link
        variant="subtitle1"
        underline="hover"
        fontWeight={ChatFontWeight}
        href="/chat"
      >
        Chat
      </Link>
    </Stack>
  );
}
