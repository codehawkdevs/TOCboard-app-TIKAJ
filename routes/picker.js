const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  if (req.user) {
    res.render("picker", { user: req.user });
  } else {
    res.redirect("/auth/login");
  }
});

router.post("/", (req, res) => {
  // you have address available in req.body:
  const fileFolderId = req.body.file;
  User.findOne({ _id: email }).then(currentUser => {
    if (currentUser) {
      currentUser.fileFolderIDs.push(fileFolderId);
      currentUser.save();
      return res.send("File/Folder ID Added Successfully");
    } else {
      return res.send("User not found");
    }
  });
});

module.exports = router;
