const express = require("express");
const Router = express.Router();
const userController = require("../../controllers/User/userController");
const { multerUploadS3 } = require("../../utils/s3Helper");

Router.get("/getUser/:_id", userController.getUser);
Router.get("/getCareGiver/:emergency/:service", userController.getCareGiver);
Router.patch(
  "/updateUser/:_id",
  multerUploadS3.any(),
  userController.updateUser
);
Router.patch(
  "/buildProfile/:_id",
  multerUploadS3.any(),
  userController.buildProfile
);
Router.patch(
  "/buildProfileUpdate/:_id",
  multerUploadS3.any(),
  userController.buildProfileUpdate
);
Router.patch("/addFavorite/:_id", userController.addFavorite);
Router.patch("/removeFavorite/:_id", userController.removeFavorite);
Router.get("/getFavorites/:_id", userController.getFavorites);
Router.get("/getBestMatch/:service", userController.getBestMatch);
Router.patch("/addView/:_id", userController.addView);
Router.get(`/getView/:_id`, userController.getView);

module.exports = Router;
