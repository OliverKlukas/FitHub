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
    content.id = Math.floor(Math.random() * 100000000 + 1).toString();
    return new Promise((resolve, reject) => {
      HttpService.post(
        this.baseURL(),
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
        `${this.baseURL()}/${id}`,
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

  /**
   * Retrieve a list of content objects.
   *
   * @returns {Promise<unknown>}
   */
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

  /**
   * Delete single content by id.
   *
   * @param id
   * @returns {Promise<unknown>}
   */
  static deleteContent(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${this.baseURL()}/${id}`,
        function (data) {
          if (data.message !== undefined) {
            resolve(data.message);
          } else {
            reject("Error while deleting content");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  /**
   * Update single content with new version.
   * @param content
   * @returns {Promise<unknown>}
   */
  static updateContent(content) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${content._id}`,
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

  static getMyContent(id) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${this.baseURL()}/getMyContent`,
        {
          userId: id,
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
