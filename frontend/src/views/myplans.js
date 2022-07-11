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
import { getBoughtPlan, getContentList } from "../redux/actions";
import { useEffect } from "react";

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
  const contentList = useSelector((state) => state.entities.contentList);

  // On open load the movie.
  useEffect(() => {
    props.getBoughtPlan(user.user._id);
  }, [planList, user.user._id]);

  // Load content when the page is loaded or the contents have changed.
  useEffect(() => {
    if (!contentList) {
        props.getContentList();
    }
}, [contentList]);

  return !contentList && !planList? (
    // Loading content.
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <CircularProgress />
    </Box>
  ) : (
    <Stack spacing={4} marginTop={5}>
      <Typography variant="h1">My Plans</Typography>
      {contentList.map((item) => {
        return <Box key={item._id}>{item._id}</Box>;     
      })}
      {planList.map((item) => {
        return <Box key={item._id}>{item._id}</Box>;     
      })}
    </Stack>
  );
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, { getBoughtPlan, getContentList })(MyPlans);
