"use Strict"

const ChatModel = require("../models/chat");

/**
 * Returns list of chats the asking user in participating in.
 *
 * @param req userId added by middleware
 * @param res
 * @return {Promise<*>} [userIds] array
 */
const getChats = async (req, res) => {
    try {
        const chats = await ChatModel.find({$or: [{partOne: req.userId}, {partTwo: req.userId}]}).exec();
        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json({
            error: "internal server error", message: error.message,
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
const updateChat = async (req, res) => {
    try {
        await ChatModel.updateOne({
            $or: [{partOne: req.userId, partTwo: req.params.id}, {partOne: req.params.id, partTwo: req.userId}]
        }, {
            $push: {messages: {senderId: req.userId, text: req.body.textMessage}}
        }).exec();
        return res.status(200).json({
            message: "Message Sent"
        })
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error", message: error.message,
        });
    }
};

module.exports = {
    getChats, updateChat,
}