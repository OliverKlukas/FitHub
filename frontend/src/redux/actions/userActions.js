import UserService from "../../services/userService";

export function signin(mail, pass) {
  function onSuccess(user) {
    return { type: "SIGNIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "SIGNIN_FAILURE", error: error };
  }
  return async (dispatch) => {
    try {
      const resp = await UserService.signin(mail, pass);
      dispatch(onSuccess(resp.user));
    } catch (err) {
      dispatch(onFailure("signin"));
    }
  };
}

export function logout() {
  UserService.logout();
  return { type: "LOGOUT" };
}

export function signinReset() {
  return { type: "SIGNIN_RESET" };
}

export function registerCustomer(mail, pass, fname, lname) {
  function onSuccess(user) {
    return { type: "SIGNIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "SIGNIN_FAILURE", error: error };
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
  title,
  picture
) {
  function onSuccess(user) {
    return { type: "SIGNIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "SIGNIN_FAILURE", error: error };
  }
  return async (dispatch) => {
    try {
      const resp = await UserService.registerContentCreator(
        mail,
        pass,
        fname,
        lname,
        title,
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

/**
 * Redux action to retrieve complete list of content creator names.
 *
 * @return {(function(*): Promise<void>)|*}
 */
export function getContentCreatorNames() {
    // Successful backend call.
    function onSuccess(creatorsNames) {
        return { type: "GETCREATORS_LIST", creatorsNames: creatorsNames };
    }
    // Backend call failed.
    function onFailure(error) {
        // error handling
        console.log("Get all content creator names failed with", error);
    }

    return async (dispatch) => {
        try {
            // ask for all content in the backend
            const creatorsNames = await UserService.getContentCreatorNames();
            // call onSuccess in context of redux
            dispatch(onSuccess(creatorsNames));
        } catch (e) {
            onFailure(e);
        }
    };
}
