import * as React from 'react';
import Link from '@mui/material/Link';
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';




export default function InsightsDrawer({currTab}) {

    let DashboardFontWeight = "normal";
    let ContentFontWeight = "normal";
    let CustomerFontWeight = "normal";

    if(currTab == "Dashboard"){
        DashboardFontWeight = "bold";
    }else if(currTab == "Content"){
        ContentFontWeight = "bold";
    }else if(currTab == "Customer"){
        CustomerFontWeight = "bold";
    }

  return (
    <Stack spacing={1}>
        <Link
          underline="hover"
          variant="subtitle1"
          fontWeight= {DashboardFontWeight}
          href="/dashboard/3000"
        >
          Dashboard
        </Link>
        <Divider/>
        <Link
          variant="subtitle1"
          underline="hover"
          fontWeight= {ContentFontWeight}
          href="/mycontent/3000"
        >
          Content
        </Link>
        <Divider/>
        <Link
          variant="subtitle1"
          underline="hover"
          fontWeight= {CustomerFontWeight}
          href="/mycustomers/3000"
        >
          Customers
        </Link>
    </Stack>
  );
};
