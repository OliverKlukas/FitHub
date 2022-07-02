export default function entities(state = {}, action) {
  switch (action.type) {
    case "GETCONTENTLIST_SUCCESS":
      return { contents: action.contents };
    case "ADDCONTENT_SUCCESS":
      return { ...state };
    default:
      return state;
  }
}
