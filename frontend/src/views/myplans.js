import { Stack, Typography } from "@mui/material";
import * as React from "react";
import { connect, useSelector } from "react-redux";
import Plan from "../components/plans/plan";
import { getBoughtPlan } from "../redux/actions/boughtPlans";
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

  const boughtPlans = useSelector((state) => {
    return state.boughtPlans;
  });

  // On open load the movie.
  useEffect(() => {
    props.getBoughtPlan(user.user._id);
  }, [boughtPlans, user.user._id]);

  const [a, seta] = React.useState(true)
  if (a && boughtPlans) {
    seta(false)
    console.log(a)
    console.log(boughtPlans)
  }

  return (
    <Stack spacing={4} marginTop={5}>
      <Typography variant="h1">My Plans</Typography>    
    </Stack>
  );
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, { getBoughtPlan })(MyPlans);
