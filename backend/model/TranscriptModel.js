const mongoose = require("mongoose")

const transcriptSchema = new mongoose.Schema({
  meetingId: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting" },
  recordingId: { type: mongoose.Schema.Types.ObjectId, ref: "Recording" },

  language: { type: String, default: "en" },

  transcriptText: String,

  segments: [
    {
      speaker: String,
      text: String,
      startTime: Number,
      endTime: Number
    }
  ]
}, { timestamps: true });

const transcriptModel = mongoose.model("Transcript", transcriptSchema);
module.exports = transcriptModel;
