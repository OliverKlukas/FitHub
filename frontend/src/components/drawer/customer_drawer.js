import * as React from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

/**
 * 
 * @param {*} currTab 
 * @returns {JSX.Element}
 */
export default function CustomerDrawer({ currTab }) {
  // default fontweight for the tabs
  let myPlansFontWeight = "normal";
  let chatFontWeight = "normal";

  // change fontweight to bold for the current tab
  if (currTab === "My Plans") {
    myPlansFontWeight = "bold";
  } else if (currTab === "Chat") {
    chatFontWeight = "bold";
  }

  return (
    <Stack spacing={1} minWidth={"5vw"} maxWidth={"15vw"} minHeight={"75vh"}>
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
