"use Strict"

const ChatModel = require("../models/chat");

/**
 * Returns the chat string, gets the userId from middleware and the Other partner via params.id.
 *
 * @param {*} req userId added by middleware, params.id set in params
 * @param {*} res 
 */
const getChat = async(req, res) => {
    try {
        const chat = await ChatModel.findOne({
            partOne: req.userId,
            partTwo: req.params.id,
        }).exec();
        return res.station(200).json({
            chat: chat,
        })
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

/**
 * Returns list of ids that are chat partners of asking user.
 *
 * @param req userId added by middleware
 * @param res
 * @return {Promise<*>} [userIds] array
 */
const getChatPartner = async(req, res) => {
    try {
        const chatPartner = await ChatModel.find({partOne: req.userId}).exec();
        return res.status(200).json(chatPartner);
    } catch (error){
        return res.status(500).json({
            error: "internal server error",
            message: error.message,
        });
    }
}

/**
 * Pushes a new chat message into an existing chat.
 *
 * @param {*} req userId added by middleware, params.id set in params, body contains the message
 * @param {*} res 
 * @returns 
 */
const updateChat = async(req, res) => {
    try {
        await ChatModel.updateOne({
            partOne: req.userId,
            partTwo: req.params.id,
          },
          {
            $push: { messages: {senderId: req.userId, text: req.body }}
          }
          ).exec();
          return res.status(200).json({
            message: "Message Sent"
          })
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    getChat,
    getChatPartner,
    updateChat,
}