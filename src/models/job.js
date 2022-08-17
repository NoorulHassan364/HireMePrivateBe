const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  service: {
    type: String,
  },

  //   weeklyHours: [{ type: Number }],
  dateRange: [{ type: String }],
  isActive: { type: Boolean, default: true },
  startDate: { type: String },
  endDate: { type: String },
  timeRange: [{ type: String }],
  user_id: { type: String },
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
  //   errands: [{ type: String }],
  specialNeedsPerson: [{ type: String }],
  specialNeedsDiseases: [{ type: String }],
  specialNeedsServices: [{ type: String }],
  detailsAboutMe: [{ type: String }],
  applicants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  hired: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  //   experience: { type: Number },
  //   education: { type: String },
  jobTitle: { type: String },
  jobDescription: { type: String },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
