export default function boughtPlans(state = {}, action) {
  switch (action.type) {
    case "GETBOUGHTPLANS_SUCCESS":
      return { boughtPlans: action.boughtPlans };
    case "ADDBOUGHTPLANS_SUCCESS":
      return { ...state };
    default:
      return state;
  }
}
