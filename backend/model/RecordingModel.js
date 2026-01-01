const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema({
      meetingId = {type : mongoose.Schema.Type.ObjectId , ref:"Meeting"},
      uploadedBy = {type : mongoose.Schema.Type.ObjectId , ref:"User"},
      fileType : {type : string , enum: ["audio", "video"]},
      fileUrl: String,
      duration: Number,
      uploadedAt: { type: Date, default: Date.now }
})

const recordingModel = new mongoose.model("Recording" , recordingSchema);

module.exports = recordingModel;