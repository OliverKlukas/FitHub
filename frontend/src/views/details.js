import {Alert, Avatar, Box, CircularProgress, Link, Rating, Stack, Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Link as RouterLink, useParams } from "react-router-dom";
import { HighlightButton } from "../components/buttons/highlight_button";
import { StandardButton } from "../components/buttons/standard_button";
import { Star } from "@mui/icons-material";
import * as React from "react";
import {getContent} from "../redux/actions";
import {connect, useSelector} from "react-redux";
import {useEffect} from "react";

// TODO: once user is connected I need the info from there
const author =  {
  name: "Simon Plashek",
  title: "professional bodybuilder & fitness coach",
  img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50",
  rating: 3,
}

/**
 * Detailed view that conveys the most important information of a content item.
 *
 * @return {JSX.Element}
 */
function Details(props) {
  // Match url id to content item.
  const { id } = useParams();
  const singleContent = useSelector((state) => {
    return state.singleContent;
  });

  // On open load the movie.
  useEffect(() => {
    props.getContent(id);
    console.log(singleContent.content)
  }, [singleContent.content]);

  return !singleContent.content && !singleContent.error ? (
      // Loading content.
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress/>
      </Box>
    ) : singleContent.error ? (
      <Alert severity="error">Loading content went wrong, sorry!</Alert>
  ) : (
    <Stack spacing={3} marginBottom={10} marginTop={5}>
      <Stack direction="row" justifyContent="space-between">
        <Carousel
          animation="slide"
          interval={6000}
          duration={1200}
          indicators={false}
          navButtonsAlwaysVisible={true}
          height="60vh"
          sx={{
            width: { xs: "100%", md: "100%", lg: "60%", xl: "60%" },
            borderRadius: 5,
            boxShadow: 5,
          }}
        >
          {singleContent.content.media.map((data, index) => (
            <img
              width="100%"
              height="100%"
              key={index}
              src={data}
              style={{ objectFit: "cover" }}
            />
          ))}
        </Carousel>
        <Box
          justifyContent="center"
          sx={{ display: { xs: "none", md: "none", lg: "flex" }, width: "35%" }}
        >
          <Stack alignItems="center" justifyContent="center">
            <Link underline="none" href={`/profile/${author.name}`}>
              <Avatar
                sx={{
                  width: "15vw",
                  height: "15vw",
                  marginBottom: 3,
                  boxShadow: 5,
                  ":hover": {
                    opacity: 0.8,
                    boxShadow: 15,
                  },
                }}
                alt="content creator"
                src={author.img}
              />
            </Link>
            <Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
                marginTop={0.5}
                marginBottom={2}
              >
                <Rating
                  size="large"
                  sx={{
                    "& .MuiRating-iconEmpty": { color: "info.main" },
                    "& .MuiRating-iconFilled": { color: "warning.main" },
                  }}
                  name="read-only"
                  value={author.rating}
                  readOnly
                  emptyIcon={<Star fontSize="inherit" />}
                />
                <Link
                  color="inherit"
                  underline="hover"
                  href={`/profile/${author.name}`}
                >
                  512 reviews
                </Link>
              </Stack>
              <Typography variant="h1">{author.name}</Typography>
              <Typography lineHeight={1.3}>{author.title}</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Stack
        spacing={4}
        sx={{ width: { xs: "100%", md: "100%", lg: "60%", xl: "60%" } }}
      >
        <Stack>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography variant="h1">{singleContent.content.title}</Typography>
            <Typography variant="h1">{singleContent.content.price}€</Typography>
          </Stack>
          <Stack
            marginBottom={2}
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Typography>
              by{" "}
              <Link
                color="inherit"
                underline="hover"
                href={`/profile/${author.name}`}
              >
                {author.name}
              </Link>
            </Typography>
            <Typography>total price</Typography>
          </Stack>
          <HighlightButton
            variant="contained"
            component={RouterLink}
            to={`/payment/${id}`}
          >
            Buy now
          </HighlightButton>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h3">Description</Typography>
          <Typography>{singleContent.content.description}</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h3">Duration</Typography>
          <Typography>{singleContent.content.duration} weeks with an intensity of {singleContent.content.intensity} sessions/week</Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h3">Sample Workout</Typography>
          <StandardButton
              variant="contained"
              href={singleContent.content.sample}
              download={singleContent.content.title}
          >
            Download
          </StandardButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

// Connect() establishes the connection to the redux functionalities.
export default connect(null, { getContent})(Details);
