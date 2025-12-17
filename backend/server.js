const express = require("express");
const {connectDB} = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();


connectDB();

app.use(express.json())

app.use("/userRoutes" , userRoutes);

app.get("/" , (req, res) =>{
  res.status(200).json("welcome to sites")
})


app.listen(5050 , () => {
  console.log("server is runing on the 5050");
})