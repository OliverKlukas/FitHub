/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
import UserService from "../../services/userService";

export function login(mail, pass) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }
  return async (dispatch) => {
    try {
      const resp = await UserService.login(mail, pass);
      dispatch(onSuccess(resp.user));
    } catch (err) {
      dispatch(onFailure(err));
    }
  };
}

export function logout() {
  UserService.logout();
  return { type: "LOGOUT" };
}

export function loginReset() {
  return { type: "LOGIN_RESET" };
}

export function registerCustomer(mail, pass, fname, lname) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }
  return async (dispatch) => {
    try {
      const resp = await UserService.registerCustomer(mail, pass, fname, lname);
      dispatch(onSuccess(resp.user));
    } catch (err) {
      dispatch(onFailure(err));
    }
  };
}

export function registerContentCreator(
  mail,
  pass,
  fname,
  lname,
  descr,
  picture
) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }
  return async (dispatch) => {
    try {
      const resp = await UserService.registerContentCreator(
        mail,
        pass,
        fname,
        lname,
        descr,
        picture
      );
      dispatch(onSuccess(resp.user));
    } catch (err) {
      dispatch(onFailure(err));
    }
  }; 
}
export function updateUser(changedUser) {
  function onSuccess(user) {
      return { type: "UPDATEUSER_SUCCESS", user: user };
  }

  function onFailure(error) {
      console.log("change user failure", error);
  }

  return async (dispatch) => {
      try {
          const user = await UserService.updateUser(changedUser);
          dispatch(onSuccess(user));
      } catch (e) {
          onFailure(e);
      }
  };
}

export function deleteUser(id) {
  function onFailure(error) {
      console.log("delete user failure", error);
  }

  return async (dispatch) => {
      try {
          await UserService.deleteUser(id);
          dispatch({type: "LOGOUT"})
      } catch (e) {
          onFailure(e);
      }
  };
}
