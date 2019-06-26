const router = require("express").Router();

router.get("/", (req, res) => {
  try {
    res.render("profile", { user: req.user });
    console.log(req.user);
  } catch (err) {
    res.redirect("/auth/login");
  }
});

module.exports = router;
