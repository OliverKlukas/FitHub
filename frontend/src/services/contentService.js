import HttpService from "./httpService";

/**
 * Offers content specific http services for CRUD db operations.
 */
export default class ContentService {
  static baseURL() {
    return "http://localhost:4000/content";
  }

  /**
   * Retrieve list of all contents in db.
   *
   * TODO: change this to a filter based request
   *
   * @returns {Promise<unknown>}
   */
  static getContentList() {
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

  /**
   * Create a new content object in db.
   *
   * @param content
   * @returns {Promise<unknown>}
   */
  static createContent(content) {
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

  /**
   * Retrieve a single content object.
   *
   * @param id
   * @returns {Promise<unknown>}
   */
  static getContent(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
          `${ContentService.baseURL()}/${id}`,
          function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
              resolve(data);
            } else {
              reject("Error while retrieving content");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
      );
    });
  }

}


