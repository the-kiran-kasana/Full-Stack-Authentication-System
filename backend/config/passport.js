const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const userModel = require("../model/UserModel");



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({
          email: profile.emails[0].value,
        });

        if (!user) {
          user = await userModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "google-auth",
          });
        }

        // ✅ SAVE TOKENS
        user.googleAccessToken = accessToken;
        if (refreshToken) {
          user.googleRefreshToken = refreshToken;
        }
        await user.save();

        // JWT for frontend
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        user.token = token;
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);













//passport.use(
//
//   new GoogleStrategy(
//       { clientID:process.env.GOOGLE_CLIENT_ID, clientSecret:process.env.GOOGLE_CLIENT_SECRET,callbackURL:"/auth/google/callback"},
//       async (accessToken, refreshToken, profile, done) => {
//
//          try{
//             let user = await userModel.findOne({email : profile.emails[0].value,});
//
//             if(!user){
//               user = await userModel.create({
//                      name: profile.displayName,email: profile.emails[0].value,password: "google-auth",
//               });
//             }
//
//             const token = jwt.sign( { id: user._id, email: user.email }, process.env.JWT_SECRET,{ expiresIn: "1d" });
//
//             user.token = token;
//             done(null, user);
//          }catch (err) {
//               done(err, null);
//          }
//       }
//   )
//)

module.exports = passport;