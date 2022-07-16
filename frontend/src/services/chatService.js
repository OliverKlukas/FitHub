import HttpService from "./httpService";

/**
 * Offers chat specific http services for database operations.
 */
export default class ChatService {
    static baseURL() {
        return "http://localhost:4000/chat";
    }

    /**
     * Retrieve list of chats requesting user.
     *
     * @return {Promise<unknown>}
     */
    static getChats(){
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${this.baseURL()}/`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving chat partner");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    /**
     * Update single chat with new message.
     *
     * @param receiverId Identifier of receiving user.
     * @param message String message of sender.
     * @returns {Promise<unknown>}
     */
    static updateChat(receiverId, message) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${this.baseURL()}/updateChat/${receiverId}`,
                {message},
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
