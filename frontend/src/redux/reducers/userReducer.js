/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
const getUser = () => {
  if (window.localStorage["jwtToken"]) {
    const token = window.localStorage["jwtToken"];
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const userJson = JSON.parse(window.atob(base64));
    // if token is expired delete it and return {}
    // --> User is not logged in anymore.
    if (userJson.exp > Date.now()) {
      window.localStorage.removeItem("jwtToken");
      return {};
    }
    return {
      user: {
        _id: userJson._id,
        email: userJson.email,
        role: userJson.role,
        fname: userJson.fname,
        lname: userJson.lname,
      },
    };
  }
  return {};
};

export default function user(state = getUser(), action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.user };
    case "LOGIN_FAILURE":
      return { error: "Password or username incorrect." };
    case "LOGIN_RESET":
      return {};
    case "LOGOUT":
      return {};
    default:
      return state;
  }
}
