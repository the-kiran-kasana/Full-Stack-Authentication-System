const express = require("express");
const {connectDB} = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const passport = require("./config/passport");
const cors = require("cors");
const app = express();
require("dotenv").config();


connectDB();

app.use(cors({
  origin : "http://localhost:5173",
  credentials: true
}));

app.use(express.json())
app.use(passport.initialize());




app.get("/auth/google",
    passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get( "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(`http://localhost:5173/google-success?token=${req.user.token}`
    );
  }
);




app.use("/userRoutes" , userRoutes);

app.get("/" , (req, res) =>{
  res.status(200).json("welcome to sites")
})


app.listen(5050 , () => {
  console.log("server is runing on the 5050");
})