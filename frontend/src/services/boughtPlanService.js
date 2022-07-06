import HttpService from "./httpService";

/**
 * Offers boughtPlan specific http services for CRUD db operations.
 */
export default class boughtPlanService {
  static baseURL() {
    return "http://localhost:4000/boughtplans";
  }

  /**
   * Retrieve list of all boughtPlans in db.
   *
   * @returns {Promise<unknown>}
   */
  static getboughtPlanList() {
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
   * Create a new boughtPlan object in db.
   *
   * @param boughtPlan
   * @returns {Promise<unknown>}
   */
  static createboughtPlan(boughtPlan) {
      boughtPlan.id = Math.floor(Math.random() * 100000000 + 1).toString();
      return new Promise((resolve, reject) => {
      HttpService.post(
        this.baseURL(),
        boughtPlan,
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
   * Retrieve a single boughtPlan object.
   *
   * @param id
   * @returns {Promise<unknown>}
   */
  static getboughtPlan(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
          `${this.baseURL()}/${id}`,
          function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
              resolve(data);
            } else {
              reject("Error while retrieving boughtPlan");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
      );
    });
  }
}


