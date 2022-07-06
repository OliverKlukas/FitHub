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
 * @returns 
 */
export default function Review(reviewer, text, date, title, starValue) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#EEEEEE",
        alignment: "right",
        borderRadius: "12px",
      }}
    >
      <Stack direction="row" spacing={4}>
        <Rating
          name="read-only"
          value={starValue}
          readOnly
          icon={<StarIcon color="warning"></StarIcon>}
        />
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body2" component="div" gutterBottom>
        {text}
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        {date}
      </Typography>
    </Box>
  );
}
