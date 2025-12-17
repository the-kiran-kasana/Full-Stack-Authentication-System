const express = require("express");
const app = express();

app.get("/" , (req, res) =>{
  res.status(200).json("welcome to sites")
})


app.listen(5050 , () => {
  console.log("server is runing on the 5050");
})