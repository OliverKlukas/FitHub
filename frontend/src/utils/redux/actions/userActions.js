import UserService from "../../../services/userService";

export function login(mail, pass) {
    function onSuccess(user) {
        return {type: "LOGIN_SUCCESS", user: user}
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error}
    }
    return async (dispatch) => {
        try {
            let resp = await UserService.login(mail, pass);
            dispatch(onSuccess(resp.user));
        } catch (err) {
            dispatch(onFailure(err));
        } 
    }
}

export function logout() {
    UserService.logout();
    return {type: "LOGOUT"};
}

export function loginReset() {
    return { type: "LOGIN_RESET"};
}

export function registerCustomer(mail, pass, fname, lname) {
    function onSuccess(user) {
        return {type: "LOGIN_SUCCESS", user: user}
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error}
    }
    return async (dispatch) => {
        try { 
            let resp = await UserService.registerCustomer(mail,pass,fname,lname)
            dispatch(onSuccess(resp.user))
        } catch (err){
            dispatch(onFailure(err))
        }
    }
}

export function registerContentCreator(mail, pass, fname, lname, descr, picture) {
    function onSuccess(user) {
        return {type: "LOGIN_SUCCESS", user: user}
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error}
    }
    return async (dispatch) => {
        try { 
            let resp = await UserService.registerContentCreator(mail,pass,fname,lname,descr,picture)
            dispatch(onSuccess(resp.user))
        } catch (err){
            dispatch(onFailure(err))
        }
    }
}