const mongoose = require("mongoose")

const userSchema = mongoose.Schema{

}

const userModel = mongoose.model("User" , userSchema);

module.exports = {userSchema}