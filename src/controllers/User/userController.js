const User = require("../../models/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// const Email = require("../../utils/mailer");
// const ResetEmail = require("../../utils/resetMailer");

// const {
//   compareString,
//   generateAccessToken,
//   hashString,
//   randomToken,
// } = require("../../utils/helper");

class Users {
  getUser = async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(_id);
      const data = await User.findById(_id);
      if (data) {
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

  getCareGiver = async (req, res) => {
    try {
      let { service, emergency } = req.params;
      emergency = JSON.parse(emergency);
      let data;
      if (emergency == true) {
        data = await User.find({
          service: service,
          role: "careGiver",
          emergencyCase: true,
        });
      } else {
        data = await User.find({
          service: service,
          role: "careGiver",
        });
      }
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getBestMatch = async (req, res) => {
    try {
      const { service } = req.params;
      console.log(service);
      const data = await User.find({ service: service }).limit(8);
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getFavorites = async (req, res) => {
    try {
      const { _id } = req.params;
      const data = await User.findById(_id).populate([{ path: "favorites" }]);
      res?.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getView = async (req, res) => {
    try {
      const { _id } = req.params;
      const data = await User.findById(_id).populate([{ path: "viewed" }]);
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  addView = async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(_id, "calling");
      const result = await User.find({
        _id: _id,
        viewed: { $in: [req.body.id] },
      });
      if (result.length == 0) {
        const data = await User.findByIdAndUpdate(
          _id,
          { $push: { viewed: req.body.id } },
          { new: true }
        );
        res?.status(200).json({ data: data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  addFavorite = async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(_id, req.body);
      const result = await User.find({
        _id: _id,
        favorites: { $in: [req.body.id] },
      });
      if (result.length == 0) {
        const data = await User.findByIdAndUpdate(
          _id,
          {
            $push: { favorites: req.body.id },
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

  removeFavorite = async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(_id, req.body);
      const data = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { favorites: req.body.id },
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

  updateUser = async (req, res) => {
    try {
      const { _id } = req.params;

      const userProfileData = {
        name: req.body.firstName,
        email: req.body.email,
        phone: req.body.phone,
        zipCode: req.body.zipCode,
        address: req.body.address,
        careNeeds: req.files
          ? req.body.careNeeds.split(",")
          : req.body.careNeeds,
      };
      if (req.files) {
        userProfileData.profileImg = req.files[0].location;
      }
      const data = await User.findByIdAndUpdate({ _id }, userProfileData, {
        new: true,
      });
      if (data) {
        res.status(200).json({ message: "updated successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  buildProfileUpdate = async (req, res) => {
    try {
      let {
        name,
        email,
        phone,
        address,
        zipCode,
        weeklyHours,
        hourlyRate,
        workingDays,
        selectedHelp,
        noOfChild,
        childAges,
        pets,
        petServices,
        tutorSubjects,
        houseKeepingServices,
        seniorCareServices,
        errands,
        specialNeedsPerson,
        specialNeedsDiseases,
        specialNeedsServices,
        detailsAboutMe,
        experience,
        education,
        emergencyCase,
        bioTitle,
        bioDescription,
      } = req.body;
      let { _id } = req.params;
      console.log(req.body, "body");
      let userProfileData;

      if (req?.files) {
        const www = weeklyHours.split(",");
        let weeklyHour = [];
        www.map((item) => weeklyHour.push(parseInt(item)));
        console.log(weeklyHour);
        userProfileData = {
          name,
          email,
          phone,
          address,
          zipCode,
          hourlyRate,
          weeklyHours: weeklyHour,
          workingDays: workingDays.split(","),
          selectedHelp: selectedHelp.split(","),
          noOfChild: parseInt(noOfChild),
          childAges: childAges.split(","),
          pets: pets.split(","),
          petServices: petServices.split(","),
          tutorSubjects: tutorSubjects.split(","),
          houseKeepingServices: houseKeepingServices.split(","),
          seniorCareServices: seniorCareServices.split(","),
          errands: errands.split(","),
          specialNeedsPerson: specialNeedsPerson.split(","),
          specialNeedsDiseases: specialNeedsDiseases.split(","),
          specialNeedsServices: specialNeedsServices.split(","),
          detailsAboutMe: detailsAboutMe.split(","),
          experience: parseInt(experience),
          education,
          emergencyCase,
          bioTitle,
          bioDescription,
        };
        console.log(userProfileData);
      } else {
        userProfileData = {
          name,
          email,
          phone,
          address,
          zipCode,
          weeklyHours,
          hourlyRate,
          workingDays,
          selectedHelp,
          noOfChild,
          childAges,
          pets,
          petServices,
          tutorSubjects,
          houseKeepingServices,
          seniorCareServices,
          errands,
          specialNeedsPerson,
          specialNeedsDiseases,
          specialNeedsServices,
          detailsAboutMe,
          experience,
          education,
          emergencyCase,
          bioTitle,
          bioDescription,
        };
      }

      if (req.files) {
        userProfileData.profileImg = req.files[0].location;
      }

      const data = await User.findByIdAndUpdate(
        ObjectId(_id),
        userProfileData,
        { new: true }
      );
      if (data) {
        res.status(200).json({ message: "profile successfully updated" });
      } else {
        res?.status(400).json({ message: "unable to update profile" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  buildProfile = async (req, res) => {
    try {
      let {
        weeklyHours,
        hourlyRate,
        workingDays,
        selectedHelp,
        noOfChild,
        childAges,
        pets,
        petServices,
        tutorSubjects,
        houseKeepingServices,
        seniorCareServices,
        errands,
        specialNeedsPerson,
        specialNeedsDiseases,
        specialNeedsServices,
        detailsAboutMe,
        experience,
        education,
        emergencyCase,
        bioTitle,
        bioDescription,
      } = req.body;
      let { _id } = req.params;
      console.log(req.body);
      let userProfileData;

      if (req?.files) {
        const www = weeklyHours.split(",");
        let weeklyHour = [];
        www.map((item) => weeklyHour.push(parseInt(item)));
        console.log(weeklyHour);
        userProfileData = {
          weeklyHours: weeklyHour,
          hourlyRate,
          workingDays: workingDays.split(","),
          selectedHelp: selectedHelp.split(","),
          noOfChild: parseInt(noOfChild),
          childAges: childAges.split(","),
          pets: pets.split(","),
          petServices: petServices.split(","),
          tutorSubjects: tutorSubjects.split(","),
          houseKeepingServices: houseKeepingServices.split(","),
          seniorCareServices: seniorCareServices.split(","),
          errands: errands.split(","),
          specialNeedsPerson: specialNeedsPerson.split(","),
          specialNeedsDiseases: specialNeedsDiseases.split(","),
          specialNeedsServices: specialNeedsServices.split(","),
          detailsAboutMe: detailsAboutMe.split(","),
          experience: parseInt(experience),
          education,
          emergencyCase,
          bioTitle,
          bioDescription,
        };
      } else {
        userProfileData = {
          weeklyHours,
          hourlyRate,
          workingDays,
          selectedHelp,
          noOfChild,
          childAges,
          pets,
          petServices,
          tutorSubjects,
          houseKeepingServices,
          seniorCareServices,
          errands,
          specialNeedsPerson,
          specialNeedsDiseases,
          specialNeedsServices,
          detailsAboutMe,
          experience,
          education,
          emergencyCase,
          bioTitle,
          bioDescription,
        };
      }

      console.log(userProfileData);
      if (req.files) {
        userProfileData.profileImg = req.files[0].location;
      }
      const data = await User.findByIdAndUpdate({ _id }, userProfileData, {
        new: true,
      });
      if (data) {
        res
          .status(200)
          .json({ message: "profile successfully updated", data: data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };
}

module.exports = new Users();
