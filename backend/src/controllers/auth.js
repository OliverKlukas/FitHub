/* eslint-disable prettier/prettier */
/* eslint-disable valid-jsdoc */
"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const UserModel = require("../models/user");
const {json} = require("body-parser");

/**
 * registers a new user
 * @param {*} req String email, String password, String firstname, String lastname, string enum role, if content creator: String description and String Picture
 * @param {*} res jwt token
 * @returns
 */
const register = async (req, res) => {
    // check request body for all required data
    if (!Object.prototype.hasOwnProperty.call(req.body, "password"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a password property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "email"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a email property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "firstName"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a firstName property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "lastName"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a lastName property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "role"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a role property",
        });
    const testUser = await UserModel.findOne({
        email: req.body.email,
    }).exec();
    if (testUser) {
        return res.status(409).json({
            error: "Bad Request",
            message: "The email is already in use",
        });
    }
    const isContentCreator = req.body.role === "contentCreator";
    if (isContentCreator) {
        if (!Object.prototype.hasOwnProperty.call(req.body, "title"))
            return res.status(400).json({
                error: "Bad Request",
                message: "The request body must contain a title property",
            });
        if (!Object.prototype.hasOwnProperty.call(req.body, "profilePicture"))
            return res.status(400).json({
                error: "Bad Request",
                message: "The request body must contain a profilePicture property",
            });
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 8); // so we do not store plaintext passwords
            const user = {
                email: req.body.email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                title: req.body.title,
                profilePicture: req.body.profilePicture,
            };

            const retUser = await UserModel.create(user);
            const token = jwt.sign(
                {
                    _id: retUser._id,
                    email: retUser.email,
                    role: retUser.role,
                    fname: retUser.firstName,
                    lname: retUser.lastName,
                },
                config.JwtSecret,
                {
                    expiresIn: 86400, // expires in 24 hours
                }
            );

            // return token
            return res.status(200).json({
                token: token,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Internal server error",
                message: error.message,
            });
        }
    } else {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 8); // so we do not store plaintext passwords
            const user = {
                email: req.body.email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName, // check seba backend, potentially different
                role: req.body.role,
            };

            const retUser = await UserModel.create(user);
            const token = jwt.sign(
                {
                    _id: retUser._id,
                    email: retUser.email,
                    role: retUser.role,
                    fname: retUser.firstName,
                    lname: retUser.lastName,
                },
                config.JwtSecret,
                {
                    expiresIn: 86400, // expires in 24 hours
                }
            );

            // return token
            return res.status(200).json({
                token: token, //
            });
        } catch (error) {
            return res.status(500).json({
                error: "Internal server error",
                message: error.message,
            });
        }
    }
};

/**
 * user Login
 * @param {*} req email, password strings
 * @param {*} res jwt token
 * @returns
 */
const signin = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (!Object.prototype.hasOwnProperty.call(req.body, "password"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a password property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "email"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a email property",
        });

    // handle the request
    try {
        // get the user form the database
        const user = await UserModel.findOne({
            email: req.body.email,
        }).exec();

        // check if the password is valid
        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) return res.status(401).send({token: null});

        // if user is found and password is valid
        // create a token
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
                fname: user.firstName,
                lname: user.lastName,
            },
            config.JwtSecret,
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

        return res.status(200).json({
            token: token,
        });
    } catch (error) {
        return res.status(404).json({
            error: "User Not Found",
            message: error.message,
        });
    }
};
/**
 * Updates a users information, unchanged information is overwritten with the original information
 * @param {*} req middleware adds the _id
 * @param {*} res
 */
const updateuser = async (req, res) => {
    try {
        const resUser = await UserModel.findByIdAndUpdate(req.userId, req.body, {
            new: true,
            runValidators: true,
        }).exec();

        // return updated Content Creator
        return res.status(200).json(resUser);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message,
        });
    }
};

/**
 * Request Userdata of firstname+lastName, optional email of requester to check if it is his own profile data
 * @param {*} req firstName, lastName, email
 * @param {*} res firstname, lastName, role, boolean isOwnProfile
 * @returns
 */
const userdata = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "userId"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a userId property",
        });
    /** this insecure logged in check is better than a middleware call, since the data returned by this call
    ** needs to be availabe to logged out users as well
    ** and the check is just needed for display logic in the frontend
    */ 
    let isloggedIn = false;
    if (Object.prototype.hasOwnProperty.call(req.body, "email")) {
        isloggedIn = true;
    }
    if (isloggedIn) {
        try {
            let isownprofile = false;
             // get requested user from database
            const requesteduser = await UserModel.findById(req.body.userId).exec();
            // get requester from database, to find out if the requester is requesting his own profile
            const requester = await UserModel.findOne({
                email: req.body.email,
            });
            isownprofile =
                requesteduser.firstName === requester.firstName &&
                requesteduser.lastName === requester.lastName;
            return res.status(200).json({
                firstname: requesteduser.firstName,
                lastname: requesteduser.lastName,
                description: requesteduser.description,
                title: requesteduser.title,
                role: requesteduser.role,
                isOwnProfile: isownprofile,
                profilePicture: requesteduser.profilePicture,
                reviews: requesteduser.reviews,
                avgReviewRating: requesteduser.avgReviewRating,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Internal Server error",
                message: error.message,
            });
        }
    } else {
        try {
            // get requested user from database
            const user = await UserModel.findById(req.body.userId).exec(); 
            return res.status(200).json({
                firstname: user.firstName,
                lastname: user.lastName,
                description: user.description,
                title: user.title,
                role: user.role,
                isOwnProfile: false,
                profilePicture: user.profilePicture,
                reviews: user.reviews,
                avgReviewRating: user.avgReviewRating,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Internal Server error",
                message: error.message,
            });
        }
    }
};

/**
 * logout
 * @param {*} req none
 * @param {*} res removes token
 */
const logout = (req, res) => {
    res.status(200).send({token: null});
};

/**
 * Adds a new review and updates the review notifications counter of the reviewed creator
 * @param {*} req Int 1-5 Star, String text, ContentCreatorID in params, userId/creatorId added by middleware
 * @param {*} res
 * @returns
 */
const addreview = async (req, res) => {
    try {
        const ratedUserId = req.params.id;
        const ratedUser = await UserModel.findById(ratedUserId).exec();
        let counter = ratedUser.newReviewsCounter;
        counter++;

        // find a Content Creator that has the id and is reviewed by the user
        // returns null if the user has not reviewed this Content Creator
        let alreadyratedUser = await UserModel.findOne({
            _id: ratedUserId,
            "reviews.creatorId": req.userId,
        });

        // Update the newNotificationCounter
        await UserModel.findByIdAndUpdate(
            ratedUserId,
            {newReviewsCounter: counter,},
            {
                new: true,
                runValidators: true,
            }).exec();

        // check if user has already reviewed this Content Creator
        if (alreadyratedUser !== null) {
            // if the user has already reviewed update his voting entry
            await UserModel.updateOne(
                {
                    _id: ratedUserId,
                    "reviews.creatorId": req.userId,
                },
                {
                    $set: {
                        "reviews.$.creatorId": req.userId,
                        "reviews.$.star": req.body.star,
                        "reviews.$.text": req.body.text,
                        "reviews.$.title": req.body.title,
                    },
                }
            );
            res.status(200).json({
                message: "Updated Review",
            });
        } else {
            // if the user has not reviewed create a new star entry
            let review = {
                creatorId: req.userId,
                star: req.body.star,
                text: req.body.text,
                title: req.body.title,
            };
            await UserModel.findByIdAndUpdate(ratedUserId, {
                $push: {reviews: review},
            });
            return res.status(200).json({
                review,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

/**
 * deletes a userAccount, Warning Message displayed in frontent, Authorization checked by middleware<
 * @param {*} req id comes from middleware
 * @param {*} res
 * @returns
 */
const deleteuser = async (req, res) => {
    try {
        await UserModel.findByIdAndRemove(req.userId).exec();

        // return message that Content Creator was deleted
        return res
            .status(200)
            .json({message: `User with id${req.userId} was deleted`});
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message,
        });
    }
};

/**
 * Retrieves all content creator names and returns them.
 *
 * @param req
 * @param res
 * @return {Promise<*>} Returns list of {firstName: {String}, lastName: {String}} items.
 */
const getContentCreatorNames = async (req, res) => {
    try {
        // Get all content  creators.
        const users = await UserModel.find({role: "contentCreator"}).exec();

        // Strip list of all information except first and last names.
        users.forEach(
            (user, index, array) =>
                (array[index] = user.firstName + " " + user.lastName)
        );

        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error: " + err.message,
        });
    }
};

/**
 * Checks if an email is already in use, Just for visuals in frontend, register function still has a separate check for security
 *
 * @param {*} req email as param
 * @param {*} res Boolean AlreadyHasAccount
 * @returns
 */
const checkEmail = async (req, res) => {
    try {
        let user = await UserModel.findOne({
            email: req.params.email,
        });
        if (user) {
            return res.status(200).json({
                alreadyHasAccount: true,
            });
        } else {
            return res.status(200).json({
                alreadyHasAccount: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message,
        });
    }
};

/**
 * Retrieves only the name of a user by its id.
 * @param req - expects an userId to be supplied.
 * @param res
 * @return {Promise<void>}
 */
const getUsername = async (req, res) => {
    try {
        // Get username based on the supplied id.
        const user = await UserModel.findById(req.params.id).exec();
        const username = user.firstName + " " + user.lastName;
        return res.status(200).json(username);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error: " + err.message,
        });
    }
};

/**
 * Retrieves only the image of a user by its id.
 *
 * @param req - expects an id to be supplied.
 * @param res
 * @return {Promise<void>}
 */
const getUserImg = async (req, res) => {
    try {
        // Get username based on the supplied id.
        const user = await UserModel.findById(req.params.id).exec();
        // If there is no profile picture the name to build an avatar is send.
        if (typeof user.profilePicture != "undefined") {
            return res.status(200).json(user.profilePicture);
        } else {
            return res.status(200).json(user.firstName);
        }
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error: " + err.message,
        });
    }
};

/**
 * gets gradingDistribution and avgReviewRating for the Dashboard
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getReviewAnalytics = async (req, res) => {
    try {
        const requesteduser = await UserModel.findById(req.body.userId).exec();

        return res.status(200).json({
            gradingDistribution: requesteduser.gradingDistribution,
            avgReviewRating: requesteduser.avgReviewRating,
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error: " + err.message,
        });
    }
};


/**
 * gets the two notification counters, for the notifications in the header
 * @param {*} req userID is added by middleware
 * @param {*} res 
 * @returns 
 */
const getNewNotifications = async (req, res) => {
    try {
        const requesteduser = await UserModel.findById(req.userId).exec();

        return res.status(200).json({
            newReviewsCounter: requesteduser.newReviewsCounter,
            newMessagesCounter: requesteduser.newMessagesCounter,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error" + error.message,
        });
    }
};

/**
 * resets the own ReviewCounter, is called when the notification for reviews is pressed in the header
 * @param {} req userId is added by middleware
 * @param {*} res 
 * @returns 
 */
const cleanReviewCounter = async (req, res) => {
    try {
        UserModel.findByIdAndUpdate(req.userId,
            {newReviewsCounter: 0}).exec();
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error" + err.message,
        });
    }
}

/**
 * resets the Message Counter, called when the notification for message is pressed in the header
 * @param {*} req userID is added by middleware
 * @param {*} res 
 * @returns 
 */
const cleanMessageCounter = async (req, res) => {
    try {
        UserModel.findByIdAndUpdate(req.userId,
            {newMessagesCounter: 0}).exec();
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error" + err.message,
        });
    }
}

/**
 * While the ReviewCounter is increased in the addreview call, the message counter is "manually" increased here
 * @param {*} req id is written as params
 * @param {*} res 
 */
const increaseMessageCounter = async (req, res) => {
    try {
        const ratedUserId = req.params.id;
        const ratedUser = await UserModel.findById(ratedUserId).exec();
        let counter = ratedUser.newReviewsCounter;
        counter++;

        await UserModel.findByIdAndUpdate(
            ratedUserId,
            {newMessagesCounter: counter,},
            {
                new: true,
                runValidators: true,
            }).exec();
    } catch (error) {
        
    }
}

module.exports = {
    register,
    signin,
    userdata,
    logout,
    updateuser,
    deleteuser,
    addreview,
    getContentCreatorNames,
    getUsername,
    checkEmail,
    getReviewAnalytics,
    getNewNotifications,
    cleanMessageCounter,
    cleanReviewCounter,
    getUserImg,
    increaseMessageCounter,
};
