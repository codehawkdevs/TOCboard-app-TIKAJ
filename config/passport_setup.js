const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user");
passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log("passport method fired");
      console.log(profile);
      new User({
        _id: profile.emails[0].value,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName
      })
        .save()
        .then(newUser => {
          console.log("user added to db");
        });
    }
  )
);
