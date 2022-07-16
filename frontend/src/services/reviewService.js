import HttpService from "./httpService";

export default class ReviewService {
  static baseURL() {
    return "http://localhost:4000/review";
  }
  static addreview(star, text, userId, title) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/addreview/${userId}`,
        {
          star: star,
          text: text,
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

}