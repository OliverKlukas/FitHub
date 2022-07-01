/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
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
          role: "Customer",
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
  static registerContentCreator(mail, pass, fName, lName, descr, picture) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          email: mail,
          password: pass,
          firstName: fName,
          lastName: lName,
          role: "Content Creator",
          description: descr,
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
}
