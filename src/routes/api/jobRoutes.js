const express = require("express");
const Router = express.Router();
const jobController = require("../../controllers/Job/jobController");

Router.post("/jobPost/:_id", jobController.postJob);
Router.get("/getJobs/:id", jobController.getJobs);
Router.get("/getJob/:_id", jobController.getJob);
Router.patch("/editJob/:_id", jobController.editJob);
Router.get("/getServiceJobs/:service", jobController.getServiceJobs);
Router.patch("/applyJob/:userId/:jobId", jobController.applyJob);
Router.delete("/deleteJob/:_id", jobController.deleteJob);
Router.patch("/addJobFavorite/:user_id/:job_id", jobController.addJobFavorite);
Router.patch(
  "/removeJobFavorite/:user_id/:job_id",
  jobController.removeJobFavorite
);
Router.get("/getJobFavorites/:_id", jobController.getJobFavorites);
Router.patch("/addtoHire/:user_id/:job_id", jobController.addToHire);
Router.patch("/removeFromHire/:user_id/:job_id", jobController.removeFromHire);
Router.get("/getHiredPeople/:_id", jobController.getHiredPeople);
Router.patch("/jobActiveToggle/:_id/:isActive", jobController.jobActiveToggle);

module.exports = Router;
