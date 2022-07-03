export default function entities(state = {}, action) {
  switch (action.type) {
    case "GETCONTENTLIST_SUCCESS":
      return { contentList: action.contentList };
    case "DELETECONTENT_SUCCESS":
      return { contentList: action.contentList};
    case "ADDCONTENT_SUCCESS":
      return { ...state };
    default:
      return state;
  }
}
