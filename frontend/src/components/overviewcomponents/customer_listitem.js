import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {ReactComponent as AvatarMale} from "../../resources/avatar_male.svg";

export default function CustomerListItem({transaction}) {
  return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <AvatarMale/>
        </ListItemAvatar>
        <ListItemText
          primary={transaction.buyer}
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
              {transaction.boughtDate}
            </React.Fragment>
          }
        />
      </ListItem>
  );
}