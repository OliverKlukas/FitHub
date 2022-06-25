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
            lastName: req.body.lastName,
            role: req.body.role, // check seba backend, potentially different
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
        res.status(200),json({
            token: token,
        })

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
}