import { Link, Stack, Typography } from "@mui/material";

/**
 * Footer component visible on all views, provides graphics attribution and links to legal pages.
 *
 * @return {JSX.Element}
 */
export default function Footer() {
  return (
    <Stack
      spacing={2}
      direction="row"
      marginY={5}
      justifyContent="space-between"
    >
      <Link
        color="#393E46"
        fontSize={14}
        fontWeight={300}
        underline="none"
        href="/terms-and-conditions"
      >
        {" "}
        Terms & Conditions
      </Link>
      <Typography variant="caption">
        Designed using resources from{" "}
        <Link color="inherit" underline="none" href="https://www.flaticon.com">
          flaticon.com
        </Link>{" "}
        and{" "}
        <Link color="inherit" underline="none" href="https://www.unsplash.com">
          unsplash.com
        </Link>
      </Typography>
      <Link
        color="#393E46"
        fontSize={14}
        fontWeight={300}
        underline="none"
        href="/about"
      >
        {" "}
        About us
      </Link>
    </Stack>
  );
}
