import {
  Stack,
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import * as React from "react";
import { connect, useSelector } from "react-redux";
import Plan from "../components/plans/plan";
import { getBoughtPlan, getContents } from "../redux/actions";
import { useEffect } from "react";
import ContentService from "../services/contentService";

/**
 * Purchase history that displays every bought content item for a specific consumer with an option to download the item,
 * contact our customer support (forward to the content creators profile)
 * and write a review (forward to the content creators profile)
 *
 * @return {JSX.Element} returns My Plans page.
 */
function MyPlans(props) {
  const user = useSelector((state) => state.user);

  // State from the redux store for plans.
  const planList = useSelector((state) => state.boughtPlan.boughtPlan);

  // State from the redux store for contents.
  const contentList = useSelector((state) => state.entities.contents);

  // On open load the movie.
  useEffect(() => {
    if (!planList) {
      props.getBoughtPlan(user.user._id);
    }
    if (!contentList) {
      props.getContents();
    }
  }, [planList, user.user._id, contentList]);

  return planList && contentList ? (
    <Stack spacing={4} marginTop={5}>
      <Typography variant="h1">My Plans</Typography>
      {planList.sort((a,b) => (a.boughtAt > b.boughtAt) ? -1 : ((b.boughtAt > a.boughtAt) ? 1 : 0)).map((item) => {
        {
          let cont;
          contentList.map((content) => {
            cont = content;
          });
          return <Plan item={cont} transaction={item} key={item._id}></Plan>;
        }
      })}
    </Stack>
  ) : (
    // Loading content.
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <CircularProgress />
    </Box>
  );
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, { getBoughtPlan, getContents })(MyPlans);
