import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

/**
 * renders one review
 * @param {*} reviewer author of the review
 * @param {*} text text of the review
 * @param {*} date date the review was submitted
 * @param {*} title title of the review
 * @param {*} starValue stars that the reviewer gave
 * @returns {JSX.Element}
 */
export default function Review({ reviewer, text, date, title, starValue }) {
  return (
    <Stack
      direction="row"
      padding={2}
      spacing={20}
      sx={{
        width: "100%",
        backgroundColor: "#EEEEEE",
        borderRadius: "8px",
      }}
    >
      <Stack spacing={4}>
        <Rating
          name="read-only"
          value={starValue}
          readOnly
          icon={<StarIcon color="warning"></StarIcon>}
        />
        <Typography variant="caption">{date}</Typography>
      </Stack>
      <Stack spacing={4}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{text}</Typography>
      </Stack>
    </Stack>
  );
}
