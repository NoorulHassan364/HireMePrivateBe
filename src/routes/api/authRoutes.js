const express = require("express");
const Router = express.Router();
const authController = require("../../controllers/Auth/authController");

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);
Router.patch("/resetPassword/:_id", authController.resetPassword);
Router.post("/forgetPassword", authController.sendResetPassword);
Router.patch("/changePassword/:_id", authController.changePassword);

module.exports = Router;
