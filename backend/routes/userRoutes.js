const express = require("express");
const userModel = require("../model/userModel");
const usrRoutes = express.Router();


usrRoutes.post("/api/auth/register" , async (req,res) => {
     const {name , email , password , role} = req.body();

})

usrRoutes.get("/userData" , async (req , res) => {
     res.status(201).json("fetching the data successfull");
})

module.exports = usrRoutes;