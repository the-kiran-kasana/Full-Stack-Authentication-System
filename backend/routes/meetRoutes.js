const express = require("express");
const upload = require("../middleware/upload");
const transcribeAudio = require("../utils/transcribeAudio");
const multer = require("multer");

const router = express.Router();

router.post("/upload-audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file)   return res.status(400).json({ error: "No file uploaded" });

    const transcript = await transcribeAudio(req.file.path);
    res.status(200).json({ message: "Audio uploaded & transcribed successfully", transcript,});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




const storage = multer.diskStorage({
  destination: "uploads/videos",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadVideo = multer({ storage });


router.post("/upload-videos", uploadVideo.single("video"), (req, res) => {
    try{

         res.json({ message: "Video uploaded successfully", videoUrl: `/uploads/videos/${req.file.filename}`, });
    }catch(err){
         res.status(500).json({ error: err.message });
    }
});

module.exports = router;
