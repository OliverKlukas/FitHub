import * as React from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export default function CustomerDrawer({ currTab }) {
  let myPlansFontWeight = "normal";
  let chatFontWeight = "normal";

  if (currTab === "My Plans") {
    myPlansFontWeight = "bold";
  } else if (currTab === "Chat") {
    chatFontWeight = "bold";
  }

  return (
    <Stack spacing={1} minWidth={"15vw"} minHeight={"75vh"}>
      <Link
        underline="hover"
        variant="subtitle1"
        fontWeight={myPlansFontWeight}
        href="/plans"
      >
        Purchases
      </Link>
      <Divider />
      <Link
        variant="subtitle1"
        underline="hover"
        fontWeight={chatFontWeight}
        href="/chat"
      >
        Chat
      </Link>
    </Stack>
  );
}
