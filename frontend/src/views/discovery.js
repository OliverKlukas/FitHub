import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageCard from "../components/cards/image_card";
import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FilterBar from "../components/filters/fitler_bar";
import theme from "../utils/theme";
import { connect, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContentList } from "../redux/actions";

/**
 * Discovery view component consisting a combinable filter bar and a filterable image list.
 *
 * @return {JSX.Element}
 */
function Discovery(props) {
  // State from the redux store for contents.
  const contentList = useSelector((state) => state.allContent.contentList);

  // Load content when the page is loaded or the contents have changed.
  useEffect(() => {
    if (!contentList) {
      props.dispatch(props.getContentList());
    }
  }, [contentList]);

  // String[] of tags that the content list should currently be filtered for.
  const [filter, setFilter] = useState([]);

  // Number[] of price range that the content list should currently be filtered for.
  const [priceRange, setPriceRange] = React.useState([0.0, 250.0]);

  // Screen size hooks to responsively control the number of content columns.
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  // Check first if no content loaded and trigger useEffect in that case.
  return !contentList ? (
    // Loading content.
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <CircularProgress />
    </Box>
  ) : !Array.isArray(contentList) ? (
    // Handle that content list might be corrupt.
    <Alert severity="error">Loading content list went wrong, sorry!</Alert>
  ) : (
    <Stack>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      {contentList.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h4">
            Unfortunately, there doesn't seem to be any fitting content! :(
          </Typography>
        </Box>
      ) : (
        <ImageList
          sx={{
            // Promotes image list into its own layer in Chrome, costs memory, but helps keeping high FPS.
            transform: "translateZ(0)",
            overflow: "hidden",
          }}
          cols={sm ? 1 : lg ? 2 : 3}
          gap={40}
        >
          {contentList.map((item) => {
            console.log(item); // TODO
            if (
              parseFloat(item.price) >= priceRange[0] &&
              parseFloat(item.price) <= priceRange[1] &&
              !item.deleteflag &&
              (filter.length === 0 ||
                item.tags.filter((tag) => filter.includes(tag)).length ===
                  filter.length)
            ) {
              return <ImageCard item={item} key={item._id} />;
            }
          })}
        </ImageList>
      )}
    </Stack>
  );
}

// Includes dispatch within the prop parameters.
const mapDispatchToProps = (dispatch) => ({
  getContentList,
  dispatch,
});

// Connect() establishes the connection to the redux functionalities.
export default connect(null, mapDispatchToProps)(Discovery);
