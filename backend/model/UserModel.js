const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String,required: true, unique: true,trim: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Use a valid email",],},
    password: { type: String,required: true,minlength: 6,select: false,},
    role: {type: String,enum: ["user", "admin"],default: "user", },
    resetPasswordToken:{type: String},
    resetPasswordExpire: {type: Date},
    googleAccessToken: { type: String },
    googleRefreshToken:{ type: String },

  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = userModel;














//const mongoose = require("mongoose")
//
//const userSchema = new mongoose.Schema({
//   name : {type : String , required : true , trim : true},
//   email : {type : String , required : true , unique:true, trim:true , match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, " use a valid email", ],},
//   password : {type : String , required : true, minlength : 6, select: false,},
//   role : {type: String, enum : ["user" , "admin"] , default :"user"},
//
//} , { timestamps: true});
//
//const userModel = mongoose.model("User" , userSchema);
//
//module.exports = userModel;
//
