import { CircularProgress, Stack, Typography } from "@mui/material";
import * as React from "react";
import { HighlightButton } from "../../components/buttons/highlight_button";
import { StandardButton } from "../../components/buttons/standard_button";
import { useEffect, useState } from "react";
import UserService from "../../services/userService";
import ContentService from "../../services/contentService";
import ConfirmDialog from "../profilecomponents/popups/confirm_dialog";
import UpdateContentPop from "../dashboardcomponents/update_content";

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

  // state for confirmation Dialog of deletion
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // state for confirmation Dialog of reactivation
  const [confirmReOpen, setConfirmReOpen] = React.useState(false);

  const handleDelete = async () => {
    let updateItem = item;
    updateItem.deleteflag = true;
    await ContentService.updateContent(updateItem);
  };

  const handleReactivation = async () => {
    let updateItem = item;
    updateItem.deleteflag = false;
    await ContentService.updateContent(updateItem);
  };

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
      <Stack>
        {item.deleteflag ? (
          <Stack>
            <HighlightButton
              key="ReactivateAccountButton"
              variant="contained"
              onClick={() => setConfirmReOpen(true)}
              sx={{ width: 300 }}
            >
              Reactivate
            </HighlightButton>
            <ConfirmDialog
              title="Reactivate content?"
              open={confirmReOpen}
              setOpen={setConfirmReOpen}
              onConfirm={handleReactivation}
            >
              Your content will be visibile again in discovery!
            </ConfirmDialog>
          </Stack>
        ) : (
          <Stack justifyContent="space-between" spacing={2}>
            <UpdateContentPop item={item} />
            <StandardButton
              variant="contained"
              sx={{ width: 300 }}
              href={item.plan}
              download={item.title}
            >
              Download
            </StandardButton>
            <HighlightButton
              key="DeleteAccountButton"
              variant="contained"
              onClick={() => setConfirmOpen(true)}
              sx={{ width: 300 }}
            >
              Delete
            </HighlightButton>
            <ConfirmDialog
              title="Hide content from buyers?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={handleDelete}
            >
              Your content will be visible for existing buyers, but hidden in
              discovery!
            </ConfirmDialog>
          </Stack>
        )}
      </Stack>
    </Stack>
  ) : (
    <CircularProgress />
  );
}
