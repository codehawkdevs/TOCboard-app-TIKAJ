const router = require("express").Router();
const passport = require("passport");
const cookieSession = require("cookie-session");

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.clearCookie("sid", { path: "/" });
  res.redirect("/");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile/");
});

module.exports = router;
