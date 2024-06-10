const express = require("express");
const { UserSignUp, UserLogIn } = require("../controllers/user");
const registerRoute = express.Router();
const logInRoute = express.Router();

registerRoute.post("/", UserSignUp);
logInRoute.post("/", UserLogIn);

module.exports = { registerRoute, logInRoute };
