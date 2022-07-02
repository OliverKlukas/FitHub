import ContentService from "../../services/contentService";

/**
 * Redux action that promises to retrieve all content in db.
 *
 * @returns {(function(*): Promise<void>)|*}
 */
export function getContentList() {
  // when the backend call was successful and the contents are retrieved
  // in the dispatcher the contents will be added to the global state
  function onSuccess(contents) {
    return { type: "GETCONTENTLIST_SUCCESS", contents: contents };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("Get all content failed with", error);
  }

  return async (dispatch) => {
    try {
      // ask for all content in the backend
      const contents = await ContentService.getContents();
      // call onSuccess in context of redux
      dispatch(onSuccess(contents));
    } catch (e) {
      onFailure(e);
    }
  };
}

/**
 * Redux action that promises to add content to db async.
 *
 * @param content
 * @returns {(function(*): Promise<void>)|*}
 */
export function addContent(content) {
  function onSuccess() {
    return { type: "ADDCONTENT_SUCCESS" };
  }
  function onFailure(error) {
    throw new Error(error);
  }

  return async (dispatch) => {
    try {
      await ContentService.createContent(content);
      dispatch(onSuccess());
    } catch (error) {
      dispatch(onFailure(error));
    }
  };
}

