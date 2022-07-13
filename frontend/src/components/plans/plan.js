import { CircularProgress, Stack, Typography } from "@mui/material";
import * as React from "react";
import { HighlightButton } from "../../components/buttons/highlight_button";
import { StandardButton } from "../../components/buttons/standard_button";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../services/userService";
import ReportDialog from "../profilecomponents/popups/report_dialog";

/**
 * my plans view content component including an overview of price, content creator, a download button, a review button that links to the content creators profile and a customer support button.
 *
 * @param item - To be displayed content item, expected to adhere to the database scheme of content.
 * @return {JSX.Element} - Returns content item that will be displayed in the myplans view.
 */
export default function Plan({ item, transaction }) {
  // Retrieve author of content item.
  const [author, setAuthor] = useState(null);

  // Function to fetch username from service.
  async function fetchUser() {
    return await UserService.userdata(item.ownerId);
  }

  // Trigger retrieval of states and backend data.
  useEffect(() => {
    fetchUser().then((res) => {
      setAuthor(res);
    });
  }, [author]);

  return author ? (
    <Stack
      direction={{ xs: "column", md: "row" }}
      padding={2}
      spacing={2}
      justifyContent="space-between"
      backgroundColor="#EEEEEE"
      sx={{
        borderRadius: 5,
        boxShadow: 5,
        width: { xs: "100%", lg: "90%", xl: "80%" },
      }}
    >
      <Stack direction="row" spacing={2}>
        <img
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          src={item.media[0]}
          alt={item.title}
        />
        <Stack justifyContent="space-between">
          <Stack spacing={2}>
            <Typography variant="h2">{item.title}</Typography>
            <Typography variant="h3">Price: {item.price} €</Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h4">
              by {author.firstname + " " + author.lastname}
            </Typography>
            <Typography variant="h4">
              order placed:{" "}
              {transaction.boughtAt.substring(
                0,
                transaction.boughtAt.indexOf("T")
              )}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack justifyContent="space-between" spacing={2}>
        <HighlightButton
          variant="contained"
          sx={{ width: 300 }}
          href={item.plan}
          download={item.title}
        >
          Download
        </HighlightButton>
        <ReportDialog width={300} content_creator_id={item.ownerId}/>
        <StandardButton
          variant="contained"
          sx={{ width: 300 }}
          component={RouterLink}
          to={`/profile/${item.ownerId}`}
        >
          Write a review
        </StandardButton>
      </Stack>
      
    </Stack>
  ) : (
    <CircularProgress />
  );
}
