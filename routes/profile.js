const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.user) {
    res.render("profile", { user: req.user });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
