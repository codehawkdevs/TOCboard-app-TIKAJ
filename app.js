const express = require("express");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const tagsRoutes = require("./routes/tags");
const passportSetup = require("./config/passport_setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
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
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("MongoDB Connected");
});
app.use(express.static(__dirname + "/public"));
// Routes setup
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/tags", tagsRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
