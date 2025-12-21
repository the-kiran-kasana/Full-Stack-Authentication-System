const express = require("express");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const usrRoutes = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
const saltRounds = 10;

const transporter = nodemailer.createTransport({
      service : "gmail",
      auth : {
           user : process.env.GOOGLE_APP_EMAIL,
           pass : process.env.GOOGLE_APP_PASSWORD,
      },
})

usrRoutes.post("/api/auth/register" , async (req,res) => {
     const {name , email , password , role} = req.body;
     const exitsUser = await userModel.findOne({email});

   try{

      if(!name || !email || !password || !role)  res.status(400).json("please fill the required");
      if(exitsUser) res.status(400).json("user already exits");

       await bcrypt.hash(password , saltRounds ,function(err, hash){
            userModel.create({name , email ,password : hash, role})
      })

      res.status(200).json({mess : "successfully register"})

   }catch(err){
      res.status(500).json("something went wrong");
   }
});

usrRoutes.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // 2️⃣ Find user and explicitly select password
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn : '24h'});

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Success
    res.status(200).json({
      message: "Successfully logged in",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


usrRoutes.post("/forget-password" , async (req,res) => {

    try{
       const {email} = req.body;
           if (!email) return res.status(400).json({ message: "Email is required" });

           let user = await userModel.findOne({email})

           if(!user) return res.status(404).json({ message: "user not found" });

           const resetToken = crypto.randomBytes(20).toString('hex');
           user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
           user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

           await user.save();

           const resetURL = `http://localhost:5173/ResetPassword/${resetToken}`;


           await transporter.sendMail({
                 from : `"Beauty&Groom" <${process.env.GOOGLE_APP_EMAIL}>`,
                 to : email,
                 subject : "Beauty&Groom - Reset Forgotten Password",
                 html : `
                      <p>hello ${email},</p>
                      <p>Please click below to reset your password for Beauty&Groom</p>
                      <a href="${resetURL}" target="_blank">${resetURL}</a>
                      <p>The above link is valid only for 2 Hours.</p>
                      <p>If you did not ask to reset your password, please ignore this message.</p>
                      <p>Thank you</p>
                 `,
           });



           console.log("Reset Link:", resetURL);

           res.json({ message: "Password reset link sent to the your mail please check it and reset password." });
    }catch(err){
          res.status(500).json({ message: "Password reset link not sent" });
    }


})

usrRoutes.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await userModel.findOne({resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() }, });

  if (!user) return res.status(400).json({ message: "Token invalid or expired" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
});





usrRoutes.get("/userData" , async (req , res) => {
     res.status(201).json("fetching the data successfull");
})

module.exports = usrRoutes;