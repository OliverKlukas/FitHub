import HttpService from "./httpService";

export default class NotificationService {
  static baseURL() {
    return "http://localhost:4000/notifications";
  }
  static cleanMessageCounter() {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${this.baseURL()}/cleanMessageCounter`,
        {},
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
  static getNewNotifications() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/notificationsnumber`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
  static cleanReviewCounter() {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${this.baseURL()}/cleanReviewCounter`,
        {},
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}