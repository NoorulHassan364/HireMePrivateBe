const User = require("../../models/user");
const Job = require("../../models/job");
const mongoose = require("mongoose");

class Jobs {
  postJob = async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(req.body);
      const data = await Job.create(req.body);
      if (data) {
        const result = await User.findByIdAndUpdate(
          _id,
          {
            $push: { jobs: data?._id },
          },
          { new: true }
        );
        if (result) {
          res.status(201).json({ message: "job Post successfully" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  editJob = async (req, res) => {
    try {
      console.log(req.body);
      const { _id } = req.params;
      const data = await Job.findByIdAndUpdate(_id, req.body, { new: true });
      if (data) {
        res.status(200).json({ message: "update successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getJob = async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(_id, "sdkhjdsfjdfhjkdfhdhf");
      const data = await Job.findById(_id).populate([{ path: "applicants" }]);
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getJobs = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Job.find({ user_id: id });
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getServiceJobs = async (req, res) => {
    try {
      const { service } = req.params;
      const data = await Job.find({ service: service, isActive: true });
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  applyJob = async (req, res) => {
    try {
      const { userId, jobId } = req.params;
      const data = await Job.findByIdAndUpdate(
        { _id: jobId },
        {
          $push: { applicants: userId },
        },
        { new: true }
      );
      if (data) {
        res
          .status(200)
          .json({ message: "application submit successfully", data: data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  deleteJob = async (req, res) => {
    try {
      const { _id } = req.params;
      const data = await Job.findByIdAndDelete(_id);
      if (data) {
        res.status(200).json({ message: "Job delete successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  addJobFavorite = async (req, res) => {
    try {
      const { user_id, job_id } = req.params;
      const result = await User.find({
        _id: user_id,
        favorites: { $in: [job_id] },
      });
      if (result.length == 0) {
        const data = await User.findByIdAndUpdate(
          { _id: user_id },
          {
            $push: { favoriteJobs: job_id },
          },
          { new: true }
        );
        res.status(200).json({ data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  removeJobFavorite = async (req, res) => {
    try {
      const { user_id, job_id } = req.params;
      const data = await User.findByIdAndUpdate(
        { _id: user_id },
        {
          $pull: { favoriteJobs: job_id },
        },
        { new: true }
      );
      console.log(data);
      res?.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getJobFavorites = async (req, res) => {
    try {
      const { _id } = req.params;
      const data = await User.findById(_id).populate([
        { path: "favoriteJobs" },
      ]);
      res?.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  addToHire = async (req, res) => {
    try {
      const { user_id, job_id } = req.params;
      console.log(req.params);
      const data = await Job.findByIdAndUpdate(
        { _id: job_id },
        {
          $push: { hired: user_id },
        },
        { new: true }
      );
      if (data) {
        res.status(200).json({ data: data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  removeFromHire = async (req, res) => {
    try {
      const { user_id, job_id } = req.params;
      const data = await Job.findByIdAndUpdate(
        { _id: job_id },
        {
          $pull: { hired: user_id },
        },
        { new: true }
      );
      if (data) {
        res.status(200).json({ data: data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getHiredPeople = async (req, res) => {
    try {
      const { _id } = req.params;
      const data = await Job.findById(_id).populate([{ path: "hired" }]);
      res?.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  jobActiveToggle = async (req, res) => {
    try {
      const { _id, isActive } = req.params;
      const data = await Job.findByIdAndUpdate(
        _id,
        { isActive: isActive },
        { new: true }
      );
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };
}

module.exports = new Jobs();
