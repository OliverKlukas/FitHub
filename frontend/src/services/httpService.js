/**
 *
 */
export default class HttpService {
  static extractUser(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const userJson = JSON.parse(window.atob(base64));
    return {
      user: {
        _id: userJson._id,
        email: userJson.email,
        role: userJson.role,
      },
    };
  }

  static async get(url, onSuccess, onError) {
    const token = window.localStorage["jwtToken"];
    const header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }

    try {
      let resp = await fetch(url, {
        method: "GET",
        headers: header,
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/signin";
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async put(url, data, onSuccess, onError) {
    const token = window.localStorage["jwtToken"];
    const header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    header.append("Content-Type", "application/json");

    try {
      let resp = await fetch(url, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/signin";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async post(url, data, onSuccess, onError) {
    const token = window.localStorage["jwtToken"];
    const header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    header.append("Content-Type", "application/json");

    try {
      let resp = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(data),
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/signin";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async remove(url, onSuccess, onError) {
    const token = window.localStorage["jwtToken"];
    const header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }

    try {
      let resp = await fetch(url, {
        method: "DELETE",
        headers: header,
      });

      if (this.checkIfUnauthorized(resp)) {
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static checkIfUnauthorized(res) {
    if (res.status === 401) {
      return true;
    }
    return false;
  }
}
