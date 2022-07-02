import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getContentList, addContent } from "../redux/actions";
import { Typography } from "@mui/material";
import { StandardButton } from "../components/buttons/standard_button";

/**
 * Manages the process of getting movie list data
 * @param {props} props
 */
function ContentListViewTest(props) {
  // state from the redux store
  const contentList = useSelector((state) => state.entities.contents);

  useEffect(() => {
    // load movies when the page is loaded or the movies have changed.
    if (!contentList) {
      loadContents();
    }
  }, [contentList]);

  const loadContents = async () => {
    // trigger the redux action getMovies
    props.dispatch(props.getContents());
  };

  const onAddContent = () => {
    props.dispatch(
      props.addContent({
        title: "Test Title",
      })
    );
    window.location.reload(false);
  };

  return !contentList ? ( // if no movies are loaded, the above useEffect should be triggered
    <Typography>Loading contents</Typography>
  ) : !Array.isArray(contentList) ? ( // apperantly something went wrong, usually there should be some kind of error handling
    <div>error</div>
  ) : (
    <div>
      {contentList.map((content) => (
        <div key={content._id}>
          {JSON.stringify(content)}
        </div>
      ))}
      <StandardButton variant="contained" onClick={onAddContent}>
        Add
      </StandardButton>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addContent,
  getContentList,
  dispatch,
});

// Connect() establishes the connection to the redux functionalities.
export default connect(null, mapDispatchToProps)(ContentListViewTest);
