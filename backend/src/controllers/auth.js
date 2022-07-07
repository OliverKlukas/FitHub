/* eslint-disable prettier/prettier */
/* eslint-disable valid-jsdoc */
"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const UserModel = require("../models/user");

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
    const isContentCreator = req.body.role === "contentCreator"
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
const login = async (req, res) => {
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
        if (!isPasswordValid) return res.status(401).send({ token: null });

        // if user is found and password is valid
        // create a token
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role, fname: user.firstName, lname: user.lastName },
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
 * 
 * @param {*} req middleware adds the _id
 * @param {*} res 
 */
const updateuser = async (req, res) => {
    try {
        const resUser = await UserModel.findByIdAndUpdate(
            req.userId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        // return updated movie
        return res.status(200).json(resUser);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message,
        });
    }
}

/**
 * Request Userdata of firstname+lastName, optional email of requester to check if it is his own profile data
 * @param {*} req firstName, lastName, email
 * @param {*} res firstname, lastName, role, boolean isOwnProfile
 * @returns
 */
const userdata = async (req, res) => {
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
    // this insecure logged in check is sufficient, since the data is publicly available anyway, and the check is just needed for display logic in the frontend
    let isloggedIn = false;
    if (Object.prototype.hasOwnProperty.call(req.body, "email")) {
        isloggedIn = true;
    }
    if (isloggedIn) {
        try {
            let isownprofile = false;
            const requesteduser = await UserModel.findOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }).exec(); // get requested user from database
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
                role: requesteduser.role,
                isOwnProfile: isownprofile,
                profilePicture: requesteduser.profilePicture,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Internal Server error",
                message: error.message,
            });
        }
    } else {
        try {
            const user = await UserModel.findOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }).exec(); // get user from database
            return res.status(200).json({
                firstname: user.firstName,
                lastname: user.lastName,
                description: user.description,
                role: user.role,
                isOwnProfile: false,
                profilePicture: user.profilePicture,
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
    res.status(200).send({ token: null });
};

// adds a review, somewhat untested
const addreview = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "userId"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a userId property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "creatorId"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a creatorId property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "star"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a star property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "text"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a text property",
        });
    try {
        const review = {
            creatorId: req.body.creatorId,
            userId: req.body.userId,
            star: req.body.star,
            text: req.body.text,
        };

        const retreview = await Usermodel.create(review);

        return res.status(200).json({
            retreview,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message,
        });
    }
};

// updates review, somewhat untested, needs the reviewID and the creatorId, only if the creatorId is equal does the request resolve, should also TODO check middleware
const updatereview = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "reviewId"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a reviewId property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "creatorId"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a creatorId property",
        });
    try {
        // TODO unsure how this should be implemented
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message,
        });
    }
};

// deletes review, somewhat untested, needs the reviewId and the CreatorId, only if the creatorid is equal does the request resolve, should also TODO check middleware
const deletereview = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "reviewId"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a reviewId property",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "creatorId"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a creatorId property",
        });
    try {
        UserModel.findOneAndDelete({
            creatorId: req.body.creatorId,
        });
        return res.status(200).json({
            message: "Succesfully deleted Review",
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message,
        });
    }
};

/**
 * 
 * @param {*} req id, comes from middleware
 * @param {*} res 
 * @returns 
 */
const deleteuser = async (req, res) => {
    try {
        await UserModel.findByIdAndRemove(req.userId).exec();

        // return message that movie was deleted
        return res
            .status(200)
            .json({ message: `User with id${req.userId} was deleted` });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    userdata,
    logout,
    updateuser,
    deleteuser,
    addreview,
    updatereview,
    deletereview,
};
