const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const createCalendarEvent = require("../utils/calendar");
const { google } = require("googleapis");

const router = express.Router();



router.post("/schedule", authMiddleware(["user" , "admin"]), async (req, res) => {
  try {
    const { title, date } = req.body;

    console.log(title, date)

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date required" });
    }

    const event = await createCalendarEvent({ title, date, });

    res.status(200).json({ message: "Event scheduled successfully", eventLink: event.htmlLink,});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create event" });
  }
});

module.exports = router;
