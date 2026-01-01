const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    meetLink: String,
    calendarEventId: String,

    participants: [
      {
        name: String,
        email: String
      }
    ],

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled"
    }
  },
  { timestamps: true }
);

const meetingModel = new mongoose.model("Meeting" , meetingSchema);
module.exports = meetingModel;

