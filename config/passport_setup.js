const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy({
    // options for strategy
    clientID:
      "948482975863-6i40i8om4gmklmln1hnouvrimiqmoelk.apps.googleusercontent.com",
    clientSecret: "evUaVLb_PFqMFD2mirDAmdvk"
  }),
  () => {
    // passport callback function
  }
);
