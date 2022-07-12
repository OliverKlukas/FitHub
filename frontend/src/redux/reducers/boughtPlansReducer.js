export default function boughtPlan(state = {}, action) {
  switch (action.type) {
    case "GETBOUGHTPLANS_SUCCESS":
      return { boughtPlan: action.boughtPlan };
    default:
      return state;
  }
}
