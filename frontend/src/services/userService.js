/**
 *
 */
import HttpService from "./httpService";

export default class UserService {
  static baseURL() {
    return "http://localhost:4000/auth";
  }
  static registerCustomer(mail, pass, fName, lName) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          email: mail,
          password: pass,
          firstName: fName,
          lastName: lName,
          role: "customer",
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
  static registerContentCreator(mail, pass, fName, lName, title, picture) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          email: mail,
          password: pass,
          firstName: fName,
          lastName: lName,
          role: "contentCreator",
          title: title,
          profilePicture: picture,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
  static login(mail, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/login`,
        {
          email: mail,
          password: pass,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
  static logout() {
    window.localStorage.removeItem("jwtToken");
  }
  static userdataloggedin(fName,lName,mail) {
    return new Promise((resolve,reject) => {
      HttpService.post(
        `${UserService.baseURL()}/userdata`,
        {
          email : mail,
          firstName : fName,
          lastName : lName,
        },
        function(data) {
          resolve(data)
        },
        function(textStatus) {
          reject(textStatus)
        }
      );
    });
  }
  static userdata(fName,lName) {
    return new Promise((resolve,reject) => {
      HttpService.post(
        `${UserService.baseURL()}/userdata`,
        {
          firstName : fName,
          lastName : lName,
        },
        function(data) {
          resolve(data)
        },
        function(textStatus) {
          reject(textStatus)
        }
      );
    });
  }

  static deleteUser() {
    return new Promise((resolve, reject) => {
        HttpService.remove(
            `${this.baseURL()}/delete`,
            function (data) {
                if (data.message !== undefined) {
                    resolve(data.message);
                } else {
                    reject("Error while deleting Account");
                }
            },
            function (textStatus) {
                reject(textStatus);
            }
        );
    });
}
static updateUser(user) {
  return new Promise((resolve, reject) => {
    HttpService.put(
        `${this.baseURL()}/update`,
        user,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
    );
  });
}
static checkEmail(email) {
  return new Promise((resolve, reject)=>{
    HttpService.get(
      `${this.baseURL()}/${email}`,
      function(data) {
        resolve(data);
      },
      function(textStatus) {
        reject(textStatus);
      }
    );
  });
}

}
