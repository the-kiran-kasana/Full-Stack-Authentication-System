const express = require("express");
const userModel = require("../model/userModel");
const usrRoutes = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;


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
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});








usrRoutes.get("/userData" , async (req , res) => {
     res.status(201).json("fetching the data successfull");
})

module.exports = usrRoutes;