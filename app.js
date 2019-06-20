const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const passportSetup = require("./config/passport_setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
// setup view engine
app.set("view engine", "ejs");

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
