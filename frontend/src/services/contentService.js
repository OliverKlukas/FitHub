/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */

import HttpService from "./httpService";

export default class ContentService {
  static baseURL() {
    return "http://localhost:4000/content";
  }

  static getContents() {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        this.baseURL(),
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createContent(content) {
    content.id = Math.floor(Math.random() * 100000000 + 1).toString();
    return new Promise((resolve, reject) => {
      HttpService.post(
        ContentService.baseURL(),
        content,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
// eslint-disable-next-line prettier/prettier
}
