const express = require("express");
const authRoutes = require("./routes/auth");
const passportSetup = require("./config/passport_setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
// setup view engine

const app = express();
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("MongoDB Connected");
});

// Routes setup
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
