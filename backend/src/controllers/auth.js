"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const UserModel = require("../models/user");


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
    try {

        const hashedPassword = bcrypt.hashSync(req.body.password, 8); // so we do not store plaintext passwords
        const user = {
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName, // check seba backend, potentially different
        };

        let retUser = await UserModel.create(user);
        const token = jwt.sign(
            {
                _id: retUser._id,
                email: retUser.email,
                role: retUser.role,
            },
            config.JwtSecret,
            {
                expiresIn: 86400 //expires in 24 hours
            }
        );

        // return token 
        return res.status(200).json({
            token: token,  //
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
}


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
        let user = await UserModel.findOne({
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
            { _id: user._id, email: user.email, role: user.role },
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

const userdata = async (req, res) => {
    try {
        let user = await UserModel.findOne({
            email: req.body.email,
        }).exec();  //get user from database
        return res.status(200).json({
            firstname: user.firstName,
            lastname: user.lastName,
            role: user.role,
            email: user.email
        })

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message
        })
    }
};

const logout = (req, res) => {
    res.status(200).send({token:null})
}

module.exports = {
    register,
    login,
    userdata,
    logout,
};