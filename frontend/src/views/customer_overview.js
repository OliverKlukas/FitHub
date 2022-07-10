import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { transaction } from "../utils/transactions";
import { creator } from "../utils/creator"; 
import CustomerListItem from "../components/overviewcomponents/customer_listitem";
import { Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import InsightsDrawer from "../components/drawer/insights_drawer";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {ReactComponent as AvatarMale} from "../resources/avatar_male.svg";

export default function CustomerOverview() {
    let { id } = useParams();
    const item = creator.find((item) => item.id == id);
    const transaction = {
      id: 5000,
      name: 'Harmony Forster',
      boughtDate: "20.09.2021",
      boughtContent: "Super training",
      contentid: 1001
  };
  return (
    <Stack direction="row" marginTop={5} spacing={5}>
      <InsightsDrawer currTab="Customer" />
      <Divider orientation="vertical" flexItem />
      <Stack spacing={1}>
          <Typography variant="h1">My Customers</Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <AvatarMale/>
        </ListItemAvatar>
        <ListItemText
          primary={transaction.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {transaction.boughtContent}
              </Typography>
              {" - "+ transaction.boughtDate}
            </React.Fragment>
          }
        />
      </ListItem>
          </List>
      </Stack>
    </Stack>
    );
}