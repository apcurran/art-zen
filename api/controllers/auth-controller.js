"use strict";

const db = require("../../db/index");
const SQL = require("sql-template-strings");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { signupValidation, loginValidation } = require("../validation/auth-validation");

// POST controllers
async function postUserSignup(req, res, next) {
    try {
        await signupValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    res.send("signup route");
}

async function postUserLogin(req, res, next) {

}

module.exports = {
    postUserSignup,
    postUserLogin,
};