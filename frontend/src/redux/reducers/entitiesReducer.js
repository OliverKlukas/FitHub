export default function entities(state = {}, action) {
  switch (action.type) {
    case "GETCONTENTLIST_SUCCESS":
      return { contentList: action.contentList };
    case "GETCONTENTS_SUCCESS":
      return { contents: action.contents };
    case "DELETECONTENT_SUCCESS":
      return { contentList: action.contentList};
    case "ADDCONTENT_SUCCESS":
      return { ...state };
    default:
      return state;
  }
}
