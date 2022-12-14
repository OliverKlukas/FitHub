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

    static addreview(star, text, userId, title) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${this.baseURL()}/addreview/${userId}`,
                {
                    star: star,
                    text: text,
                    title: title,
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

    static signin(mail, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/signin`,
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

    static userdataloggedin(id, mail) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/userdata`,
                {
                    email: mail,
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

    static userdata(id) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/userdata`,
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

    /**
     * Retrieves complete list of all content creators offering content.
     *
     * @return {Promise<unknown>} Collection of {firstName: {String}, lastname: {String}} pairs.
     */
    static getContentCreatorNames() {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${this.baseURL()}/getCreators`,
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
     * Retrieves user name based on id.
     *
     * @param id
     * @return {Promise<unknown>}
     */
    static getUsername(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${this.baseURL()}/getUsername/${id}`,
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
     * Retrieves user img based on id.
     *
     * @param id
     * @return {Promise<unknown>}
     */
    static getUserImg(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${this.baseURL()}/getUserImg/${id}`,
                function (data) {
                    resolve(data);
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
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${this.baseURL()}/${email}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getAnalytics(id) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${this.baseURL()}/getReviewAnalytics`,
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
    static increaseMessageCounter(id) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${this.baseURL()}/increaseMessageCounter/${id}`,
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
