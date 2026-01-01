const express = require("express");
const {connectDB} = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const passport = require("./config/passport");
const meetRoutes = require("./routes/meetRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();


connectDB();

app.use(cors({
  origin : "http://localhost:5174",
  credentials: true
}));

app.use(express.json())
app.use(passport.initialize());




app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
    accessType: "offline",
    prompt: "consent"
  })
);

app.get( "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(`http://localhost:5174/google-success?token=${req.user.token}`
    );
  }
);


app.use("/uploads", express.static("uploads"));

app.use("/meeting", meetRoutes);
app.use("/userRoutes" , userRoutes);


// global error handler
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.get("/" , (req, res) =>{
  res.status(200).json("welcome to sites")
})



app.listen(5050 , () => {
  console.log("server is runing on the 5050");
})