import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { creator } from "../utils/creator";
import { content } from "../utils/content";
import Plan from "../components/plans/plan";

/**
 * Purchase history that displays every bought content item for a specific consumer with an option to download the item,
 * contact our customer support (forward to the content creators profile)
 * and write a review (forward to the content creators profile)
 *
 * @returns {JSX.Element}
 */

export default function MyContent() {
  // Match url id to consumer item.
  const { id } = useParams();

  // eslint-disable-next-line
    const item = creator.find((item) => item.id == id);

  return (
    <Stack spacing={4} marginTop={5}>
      <Typography variant="h1">My Content</Typography>

      {content.map((con) => {
        if (item.offeredContent.includes(con.id)) {
          return <Plan item={con} key={con.img} />;
        }
      })}
    </Stack>
  );
}
