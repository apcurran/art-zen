"use strict";

const db = require("../../db/index");
const SQL = require("sql-template-strings");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST controllers
async function postUserSignup(req, res, next) {

}

async function postUserLogin(req, res, next) {

}

module.exports = {
    postUserSignup,
    postUserLogin,
};