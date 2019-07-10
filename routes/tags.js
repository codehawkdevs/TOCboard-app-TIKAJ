const router = require("express").Router();
const User = require("../models/user");
router.get("/", (req, res) => {
  if (req.user) {
    res.send(
      "authenticated. send a POST request using postman for adding the tags with {email, tags} parameters"
    );
  } else {
    res.send("you are not allowed to access this.");
  }
});

router.post("/", (req, res) => {
  let email = req.body.email;
  let tag = req.body.tag;

  User.findOne({ _id: email }).then(currentUser => {
    if (currentUser) {
      currentUser.tags.push(tag);
      currentUser.save();
      return res.send("Tag Added Successfully");
    } else {
      return res.send("User not found");
    }
  });
});
module.exports = router;
