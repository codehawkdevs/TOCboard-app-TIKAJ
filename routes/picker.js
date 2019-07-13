const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  if (req.user) {
    res.render("picker");
  } else {
    res.redirect("/auth/login");
  }
});

router.post("/", (req, res) => {
  // you have address available in req.body:

  let email = req.user._id;
  const fileFolderId = req.body.file;
  User.findOne({ _id: email }).then(currentUser => {
    if (currentUser) {
      currentUser.fileFolderIDs.push(fileFolderId);
      currentUser.save();
      return res.send("Tag Added Successfully");
    } else {
      return res.send("User not found");
    }
  });
});

module.exports = router;
