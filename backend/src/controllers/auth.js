"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const UserModel = require("../models/user");



// needs password, email, firstName, lastname and role TODO if it has role Content Creator it also needs description and picture, returns token if succesful
// TODO add email is already used check?
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

// needs email and password, returns login token
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


// TESTMETHOD  returns userdata to check if the data was correctly generated, needs to be changed later to send the public data if
// the given first name and last name map to a content creator
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


// main functionality of this needs to be in TODO middleware
const logout = (req, res) => {
    res.status(200).send({ token: null });
};



// adds a review, somewhat untested
const addreview = (req, res) => {
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
        }

        let retreview = await.Usermodel.create(review);

        return res.status(200).json({
            retreview
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message
        });
    }
};


//updates review, somewhat untested, needs the reviewID and the creatorId, only if the creatorId is equal does the request resolve, should also TODO check middleware
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
            //TODO unsure how this should be implemented
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message
        });
    }
}

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
        let review = UserModel.findOneAndDelete({
            creatorId: req.body.creatorId
        })
        return res.status(200).json({
            message: "Succesfully deleted Account"
        })
        
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message
        });
    }
}

// TODO needs to check middleware and then deletes the account
const deleteuser = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "email"))
    return res.status(400).json({
        error: "Bad Request",
        message: "The request body must contain a email property",
    });
    try {
        UserModel.findOneAndDelete({
            email: req.body.email
        });
        return res.status(200).json({
            message: "Succesfully deleted Account"
        })
        
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error",
            message: error.message
        });
    }
}



module.exports = {
    register,
    login,
    userdata,
    logout,
    deleteuser,
    addreview,
    updatereview,
    deletereview,
};