const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    unique: [true, "email already exist"],
  },

  address: {
    type: String,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "you must have password"],
  },

  zipCode: { type: Number },

  role: {
    type: String,
  },

  careNeeds: [
    {
      type: String,
    },
  ],

  service: {
    type: String,
  },

  profileImg: {
    type: String,
  },

  weeklyHours: [{ type: Number }],
  hourlyRate: { type: String },
  workingDays: [{ type: String }],
  selectedHelp: [{ type: String }],
  noOfChild: { type: Number },
  childAges: [{ type: String }],
  pets: [{ type: String }],
  petServices: [{ type: String }],
  tutorSubjects: [{ type: String }],
  houseKeepingServices: [{ type: String }],
  seniorCareServices: [{ type: String }],
  errands: [{ type: String }],
  specialNeedsPerson: [{ type: String }],
  specialNeedsDiseases: [{ type: String }],
  specialNeedsServices: [{ type: String }],
  detailsAboutMe: [{ type: String }],
  experience: { type: Number },
  education: { type: String },
  bioTitle: { type: String },
  bioDescription: { type: String },
  jobs: [{ type: mongoose.Types.ObjectId, ref: "Job", default: [] }],
  favorites: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
  favoriteJobs: [{ type: mongoose.Types.ObjectId, ref: "Job", default: [] }],
  viewed: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
  emergencyCase: { type: Boolean },
  reviews: [{ type: Object }],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
