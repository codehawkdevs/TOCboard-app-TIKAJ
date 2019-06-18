const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

// setup view engine
app.set("view engine", "ejs");

// Routes setup
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
