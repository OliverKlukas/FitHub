import { CircularProgress, Stack, Typography } from "@mui/material";
import * as React from "react";
import { HighlightButton } from "../../components/buttons/highlight_button";
import { StandardButton } from "../../components/buttons/standard_button";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../services/userService";

/**
 * get image src path.
 *
 * Adapted from: https://mui.com/material-ui/react-image-list/#CustomImageList.js
 *
 * @param image - String path to image resource.
 * @param width - Number desired width of image.
 * @param height - Number desired height of image.
 * @returns {{src: string}} - Returns src variable for img.
 */
function srcset(image, width, height) {
  return {
    src: `${image}?w=${width}&h=${height}&fit=crop&auto=format`,
  };
}

/**
 * my plans view content component including an overview of price, content creator, a download button, a review button that links to the content creators profile and a customer support button.
 *
 * @param item - To be displayed content item, expected to adhere to the database scheme of content.
 * @returns {JSX.Element} - Returns content item that will be displayed in the myplans view.
 */
export default function OffContent({ item }) {
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

  const dateFromObjectId = function (objectId) {
    const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    const retstring =
      date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
    return retstring;
  };

  //console.log(item);

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
        width: 800,
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
              uploaded: {dateFromObjectId(item._id)}
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
          Delete
        </HighlightButton>
        <StandardButton variant="contained" sx={{ width: 300 }}>
          Update
        </StandardButton>
        <StandardButton
          variant="contained"
          sx={{ width: 300 }}
          href={item.plan}
          download={item.title}
        >
          Download
        </StandardButton>
      </Stack>
    </Stack>
  ) : (
    <CircularProgress />
  );
}
