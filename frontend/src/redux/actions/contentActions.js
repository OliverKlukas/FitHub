/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
import ContentService from "../../services/contentService";

/**
 * Redux action that promises to retrieve all content in db.
 *
 * @returns {(function(*): Promise<void>)|*}
 */
export function getContentList() {
  // when the backend call was successful and the contents are retrieved
  // in the dispatcher the contents will be added to the global state
  function onSuccess(contentList) {
    return { type: "GETCONTENTLIST_SUCCESS", contentList: contentList };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("Get all content failed with", error);
  }

  return async (dispatch) => {
    try {
      // ask for all content in the backend
      const contentList = await ContentService.getContentList();
      // call onSuccess in context of redux
      dispatch(onSuccess(contentList));
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

/**
 * Update a single content item.
 *
 * @param changeContent
 * @returns {(function(*): Promise<void>)|*}
 */
export function changeContent(changeContent) {
  function onSuccess(content) {
    return { type: "UPDATECONTENT_SUCCESS", content: content };
  }

  function onFailure(error) {
    console.log("change content failure", error);
  }

  return async (dispatch) => {
    try {
      let content = await ContentService.updateContent(changeContent);
      dispatch(onSuccess(content));
    } catch (e) {
      onFailure(e);
    }
  };
}

/**
 * Retrieves a single content item.
 *
 * @param id
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const getContent = (id) => {
  function onSuccess(content) {
    return { type: "GETCONTENT_SUCCESS", content: content };
  }
  function onFailure(error) {
    console.log("failed to load a content", error);
  }

  return async (dispatch, getState) => {
    try {
      let content = await ContentService.getContent(id);
      dispatch(onSuccess(content));
    } catch (e) {
      onFailure(e);
    }
  };
};

/**
 * Deletes content item by id.
 *
 * @param id
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteContent(id) {
  function onSuccess(contentList) {
    return { type: "DELETECONTENT_SUCCESS", contentList: contentList };
  }
  function onFailure(error) {
    console.log("delete movie failure", error);
  }

  return async (dispatch) => {
    try {
      await ContentService.deleteContent(id);
      let contentList = await ContentService.getContentList();
      dispatch(onSuccess(contentList));
    } catch (e) {
      onFailure(e);
    }
  };
}
